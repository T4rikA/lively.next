/* global WeakMap */
import { Rectangle, rect, pt } from 'lively.graphics';
import { arr } from 'lively.lang';

import { Range } from '../text/range.js';

function todo (name) { throw new Error('not yet implemented ' + name); }

export default class TextLayout {
  constructor () {
    this.reset();
  }

  reset () {
    this.resetLineCharBoundsCache();
  }

  restore (serializedLineBounds, morph) {
    const decompress = (compressedBounds) => {
      let x = 0; const y = 0;
      return arr.histogram(compressedBounds, compressedBounds.length / 3).map(([count, width, height]) => {
        const batch = [];
        for (let i = 0; i < count; i++) {
          batch.push(rect(x, y, width, height));
          x += width;
        }
        return batch;
      }).flat();
    };

    for (const [row, compressedBounds] of serializedLineBounds) {
      const v = decompress(compressedBounds);
      // we get the lines too early, and these will be replaced
      this.lineCharBoundsCache.set(morph.document.getLine(row), v);
    }
  }

  resetLineCharBoundsCache (morph) {
    this.lineCharBoundsCache = new WeakMap();
    if (morph && !morph._isDeserializing) {
      this.estimateLineHeights(morph);
      morph.makeDirty();
    }
  }

  resetLineCharBoundsCacheOfLine (line) {
    if (!line) return;
    this.lineCharBoundsCache.set(line, null);
  }

  resetLineCharBoundsCacheOfRow (morph, row) {
    const doc = morph.document;
    if (morph._isDeserializing && morph._initializedByCachedBounds) return;
    doc && this.resetLineCharBoundsCacheOfLine(doc.getLine(row));
  }

  resetLineCharBoundsCacheOfRange (morph, range) {
    for (let row = range.start.row; row <= range.end.row; row++) { this.resetLineCharBoundsCacheOfRow(morph, row); }
  }

  estimateLineHeightsInRange (morph, range) {
    const doc = morph.document; const transform = morph.getGlobalTransform();
    for (let row = range.start.row; row <= range.end.row; row++) { this.resetLineCharBoundsCacheOfRow(morph, doc.getLine(row), transform); }
  }

  estimateExtentOfLine (morph, line, transform = morph.getGlobalTransform()) {
    const {
      fontMetric, lineWrapping,
      padding, textRenderer, debug, defaultTextStyle
    } = morph;
    let { x: morphWidth, y: morphHeight } = morph.getProperty('extent');
    const paddingLeft = padding.left();
    const paddingRight = padding.right();
    const paddingTop = padding.top();
    const paddingBottom = padding.bottom();
    const directRenderTextLayerFn = textRenderer.directRenderTextLayerFn(morph);
    const textAttributes = line.textAndAttributes; const styles = []; let inlineMorph;

    morphWidth = morphWidth - paddingLeft - paddingRight;

    // find all styles that apply to line
    if (!textAttributes || !textAttributes.length) styles.push(defaultTextStyle);
    else {
      for (let j = 0, column = 0; j < textAttributes.length; j += 2) {
        inlineMorph = textAttributes[j];
        if (inlineMorph && inlineMorph.isMorph) {
          inlineMorph.position = this.pixelPositionFor(morph, { row: line.row, column }).subPt(morph.origin);
          column++;
        } else if (inlineMorph) {
          column += inlineMorph.length;
        }
        styles.push({ ...defaultTextStyle, ...textAttributes[j + 1] });
      }
    }

    // measure default char widths and heights
    const measureCount = styles.length; // for avg width
    let charWidthSum = 0;
    let charHeight = 0;
    for (let h = 0; h < measureCount; h++) {
      const { width, height } = fontMetric.defaultCharExtent(morph, {
        defaultTextStyle: styles[h],
        width: 1000,
        transform,
        paddingBottom,
        paddingTop,
        paddingRight,
        paddingLeft
      }, directRenderTextLayerFn);
      charHeight = Math.max(height, charHeight);
      charWidthSum = charWidthSum + width;
    }

    var estimatedHeight = charHeight;
    const charCount = line.text.length || 1;
    const charWidth = Math.round(charWidthSum / measureCount);
    const unwrappedWidth = charCount * charWidth;
    const estimatedWidth = !lineWrapping ? unwrappedWidth : Math.min(unwrappedWidth, morphWidth);
    if (lineWrapping) {
      const charsPerline = Math.max(3, morphWidth / charWidth);
      const wrappedLineCount = Math.ceil(charCount / charsPerline) || 1;
      var estimatedHeight = Math.round(wrappedLineCount * charHeight);
    }
    debug && console.log(`${line.row}: ${line.height} => ${estimatedHeight}`);
    line.changeExtent(estimatedWidth, estimatedHeight, true);
  }

  estimateLineHeights (morph, force) {
    let {
      fontMetric, textRenderer, document,
      defaultTextStyle,
      clipMode, textAlign, padding, lineWrapping,
      debug
    } = morph;
    const { x: morphWidth, y: morphHeight } = morph.getProperty('extent');
    const transform = morph.getGlobalTransform();
    const paddingLeft = padding.left();
    const paddingRight = padding.right();
    const paddingTop = padding.top();
    const paddingBottom = padding.bottom();
    const { lines, stringSize } = document;
    const directRenderTextLayerFn = textRenderer.directRenderTextLayerFn(morph);

    if (debug) {
      debug = morph.debugHelper(debug);
      if (!debug.debugTextLayout) debug = false;
    }

    // fast and exact version for small texts and no fontFamily inside textAndAttributes:
    if (!debug &&
        morph.lineCount() < 10 &&
        morph.document.stringSize < 3000 &&
        !morph.textAndAttributes.some(attr => attr && attr.fontFamily != undefined)) {
      const directRenderLineFn = textRenderer.directRenderLineFn(morph);
      const linesBounds = fontMetric.manuallyComputeBoundsOfLines(
        morph, lines, 0, 0, {
          defaultTextStyle,
          width: morphWidth,
          height: morphHeight,
          clipMode,
          lineWrapping,
          textAlign,
          transform,
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom
        }, directRenderTextLayerFn, directRenderLineFn);
      for (var i = 0; i < lines.length; i++) {
        const { width, height } = linesBounds[i];
        lines[i].changeExtent(width, height, !fontMetric.isFontSupported(morph.fontFamily, morph.fontWeight));
      }
      return;
    }

    let nMeasured = 0;

    for (var i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (!force && line.height > 0) continue;

      nMeasured++;
      this.estimateExtentOfLine(morph, line, transform);
    }

    morph.viewState._textLayoutStale = false;

    debug && debug.log(`estimateLineHeights, ${nMeasured}/${lines.length} updated, force: ${force}`);
  }

  defaultCharExtent (morph) {
    const { textRenderer, fontMetric, defaultTextStyle } = morph;
    const transform = morph.getGlobalTransform();
    const directRenderTextLayerFn = textRenderer.directRenderTextLayerFn(morph);
    return fontMetric.defaultCharExtent(morph, { transform, defaultTextStyle, width: 1000 }, directRenderTextLayerFn);
  }

  textBounds (morph) {
    const {
      document: doc,
      padding,
      borderWidthLeft,
      borderWidthRight,
      borderWidthTop,
      borderWidthBottom
    } = morph;

    return new Rectangle(
      padding.left(), padding.top(),
      Math.round(doc.width + borderWidthLeft + borderWidthRight),
      Math.round(doc.height + borderWidthTop + borderWidthBottom));
  }

  isFirstLineVisible (morph) {
    return morph.viewState.firstVisibleRow <= 0;
  }

  isLastLineVisible (morph) {
    return morph.viewState.lastVisibleRow >= morph.lineCount() - 1;
  }

  isLineVisible (morph, row) {
    return row >= morph.viewState.firstVisibleRow && row <= morph.viewState.lastVisibleRow;
  }

  isLineFullyVisible (morph, row) {
    return row >= morph.viewState.firstFullyVisibleRow && row <= morph.viewState.lastFullyVisibleRow;
  }

  whatsVisible (morph) {
    const startRow = morph.viewState.firstVisibleRow;
    const endRow = morph.viewState.lastVisibleRow;
    const lines = morph.document.lines.slice(startRow, endRow);
    return { lines, startRow, endRow };
  }

  firstFullVisibleLine (morph) { return morph.viewState.firstFullyVisibleRow; }
  lastFullVisibleLine (morph) { return morph.viewState.lastFullyVisibleRow; }

  screenLineRange (morph, textPos, ignoreLeadingWhitespace) {
    // find the range that includes textPos whose start and end chars are in a
    // horizontal line. Normally all chars of a line are positioned horizontally
    // next to each other, unless the line is wrapped. This is for figuring
    // that out

    let { row, column } = textPos;
    column = Math.max(0, column);
    row = Math.min(morph.lineCount() - 1, Math.max(0, row));

    const charBounds = this.charBoundsOfRow(morph, row);
    if (column > charBounds.length - 1) column = charBounds.length - 1;
    const bounds = charBounds[column];

    let firstIndex = column; let lastIndex = column;

    for (var i = column + 1; i < charBounds.length; i++) {
      if (charBounds[i].y + charBounds[i].height > bounds.y + bounds.height) break;
      lastIndex = i;
    }
    // For last range we go until end of line
    if (lastIndex === charBounds.length - 1) lastIndex++;

    for (var i = column - 1; i >= 0; i--) {
      if (charBounds[i].y + charBounds[i].height < bounds.y + bounds.height) break;
      firstIndex = i;
    }

    if (ignoreLeadingWhitespace) {
      const rangeString = morph.getLine(row).slice(firstIndex, lastIndex);
      const skip = rangeString.match(/^\s*/)[0].length;
      firstIndex = firstIndex + skip;
    }

    return new Range({ start: { row, column: firstIndex }, end: { row, column: lastIndex } });
  }

  rangesOfWrappedLine (morph, row) {
    const lineLength = morph.getLine(row).length;
    let column = 0; const ranges = [];
    while (true) {
      const range = this.screenLineRange(morph, { row, column }, false);
      ranges.push(range);
      if (range.end.column >= lineLength) break;
      const nextColumn = range.end.column + 1;
      if (nextColumn >= lineLength) break;
      if (nextColumn <= column) {
        if (!morph.env.renderer.getNodeForMorph(morph)) {
          column = nextColumn;
          break;
        }
        throw new Error(`should not happen ${range.end.column} vs ${column}`);
      }
      column = nextColumn;
    }
    return ranges;
  }

  chunkAtPos (morph, pos) { todo('chunkAtPos'); }

  charBoundsOfRow (morph, row) {
    const doc = morph.document;
    const line = doc.getLine(row);

    if (morph._initializedByCachedBounds && !this._restored) {
      this.restore(morph._initializedByCachedBounds, morph);
      this._restored = true;
    }

    const cached = this.lineCharBoundsCache.get(line);
    if (cached) return cached;

    const { x: width, y: height } = morph.getProperty('extent');
    const {
      fontMetric, textRenderer,
      defaultTextStyle,
      clipMode, textAlign, padding, lineWrapping
    } = morph;
    const transform = morph.getGlobalTransform();
    const paddingLeft = padding.left();
    const paddingRight = padding.right();
    const paddingTop = padding.top();
    const paddingBottom = padding.bottom();
    const directRenderLineFn = textRenderer.directRenderLineFn(morph);
    const directRenderTextLayerFn = textRenderer.directRenderTextLayerFn(morph);
    const charBounds = fontMetric.manuallyComputeCharBoundsOfLine(
      morph, line, 0, 0, {
        defaultTextStyle,
        width,
        height,
        clipMode,
        lineWrapping,
        textAlign,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        transform
      }, directRenderTextLayerFn, directRenderLineFn);
    if (charBounds.find(r => r.width == undefined && r.height == undefined)) {
      // measuring failed, probably due to https://stackoverflow.com/questions/57590718/range-getclientrects-is-returning-0-rectangle-when-used-with-textarea-in-html
      // delay measuring until next render
      return charBounds;
    }
    this.lineCharBoundsCache.set(line, charBounds);
    return charBounds;
  }

  computeMaxBoundsForLineSelection (morph, selection) {
    /*
      Computes the biggest character bounds of a selection with respect
      to a single line. If a selection that spans multiple lines is provided,
      the selection is reduced to the full remainder of the first line selected.
      If the selection is a single line, yet spans multiple lines due to line wrapping,
      again, only the items within the first line are taken into account.
    */
    var { start, end } = selection;
    const textLayout = morph.textLayout;
    const intersectingRect = textLayout.rangesOfWrappedLine(morph, start.row)
      .find(r => r.containsPosition(start));
    var end = (morph.lineWrapping && intersectingRect) ? intersectingRect.intersect(selection).end : end;
    var end = end.row == start.row ? end : { row: end.row, column: -1 };
    var charBoundsInSelection = textLayout.charBoundsOfRow(morph, start.row);
    var charBoundsInSelection = end.column < 0
      ? charBoundsInSelection.slice(start.column)
      : charBoundsInSelection.slice(start.column, end.column + 1);
    const maxCol = start.column + (charBoundsInSelection
      ? charBoundsInSelection.indexOf(arr.max(charBoundsInSelection, b => b.height))
      : 0);
    return textLayout.boundsFor(morph, { row: start.row, column: maxCol });
  }

  boundsFor (morph, docPos) {
    let { row, column } = docPos;
    column = Math.max(0, column);
    row = Math.min(morph.lineCount() - 1, Math.max(0, row));

    const charBounds = this.charBoundsOfRow(morph, row);
    let bounds;

    if (charBounds.length > 0) {
      if (column >= charBounds.length) {
        const { x, y, width, height } = charBounds[charBounds.length - 1];
        bounds = new Rectangle(x + width, y, 0, height);
      } else bounds = Rectangle.fromLiteral(charBounds[column]);
    }

    if (!bounds) {
      // throw new Error(`Cannot compute bounds for line ${row}/${column}`);
      console.warn(`Cannot compute bounds for line ${row}/${column}`);
      bounds = new Rectangle(0, 0, 0, 0);
    }
    const { document: doc, padding } = morph;
    bounds.x = bounds.x + padding.left();
    bounds.y = bounds.y + doc.computeVerticalOffsetOf(row) + padding.top();

    return bounds;
  }

  pixelPositionFor (morph, docPos) {
    return this.boundsFor(morph, docPos).topLeft();
  }

  textPositionFromPoint (morph, point) {
    let { x, y } = point.addPt(morph.origin);
    const { document: doc, padding, origin } = morph;
    const padL = padding.left();
    const padT = padding.top();

    if (y > doc.height + padT) return doc.endPosition;
    else if (y < padT) return { row: 0, column: 0 };

    const found = doc.findLineByVerticalOffset(y - padT);

    if (!found) // shouldn't happen...
    { return { row: 0, column: 0 }; }

    const { line: { row } } = found;
    const charBounds = this.charBoundsOfRow(morph, row);
    const nChars = charBounds.length;
    const first = charBounds[0];
    const last = charBounds[nChars - 1];
    const result = { row, column: 0 };

    // charBounds are in local line coordinates. Translate points x, y so that it fits
    x = x - padL;
    y = y - (padT + doc.computeVerticalOffsetOf(row));

    // everything to the left of the first char + half its width is col 0
    if (nChars === 0 || (x <= first.x + Math.round(first.width / 2) &&
                      y >= first.y && y <= first.y + first.height)) return result;

    if (x > last.x + Math.round(last.width / 2) && y >= last.y && y <= last.y + last.height) {
      result.column = nChars;
      return result;
    }

    // find col so that x between right side of char[col-1] and left side of char[col]
    // consider wrapped lines, i.e. charBounds.y <= y <= charBounds.y+charBounds.height
    const wrappedCharBoundsWithMatchingVerticalPos = [];
    for (var i = nChars - 1; i >= 0; i--) {
      const cb = charBounds[i];
      const { x: cbX, width: cbWidth, y: cbY, height: cbHeight } = cb;
      if (y < cbY || y > cbY + cbHeight) continue;
      wrappedCharBoundsWithMatchingVerticalPos.push(cb);
      if (x >= cbX + Math.round(cbWidth / 2)) {
        const clickedAtEndOfWrappedLine = wrappedCharBoundsWithMatchingVerticalPos.length === 1;
        result.column = clickedAtEndOfWrappedLine ? i/* pos in front of line break */ : i + 1;
        return result;
      }
    }

    // we counted backwards, so the last bounds in
    // wrappedCharBoundsWithMatchingVerticalPos is actually the first in the
    // wrapped line. Since we are left of its center, we just take it
    if (wrappedCharBoundsWithMatchingVerticalPos.length) {
      result.column = charBounds.indexOf(arr.last(wrappedCharBoundsWithMatchingVerticalPos));
      return result;
    }

    // if still not found we go by proximity...
    let minDist = Infinity; let minIndex = -1;
    for (var i = 0; i < charBounds.length; i++) {
      const cb = charBounds[i];
      const { x: cbX, width: cbWidth, y: cbY, height: cbHeight } = cb;
      const dist = point.distSquared(pt(cbX + cbWidth / 2, cbY + cbHeight / 2));
      if (dist >= minDist) continue;
      minDist = dist;
      minIndex = i;
    }

    result.column = minIndex;
    return result;
  }
}
