/* global XMLSerializer */
/* global fetch */

import { Morph, Icon } from 'lively.morphic';
import vdom from 'virtual-dom';
import { pt, Color } from 'lively.graphics';
const { diff, patch, create: createElement } = vdom;
import { Window } from 'lively.components';
import SVGWorkspace from './SVGWorkspace.js';

class SVGVNode {
  constructor (morph, renderer) {
    this.morph = morph;
    this.renderer = renderer;
    this.morphVtree = null;
    // unique identifier for VDOM
    this.key = `custom-${morph.id}`;
  }

  get type () { return 'Widget'; }

  renderMorph () {
    this.morphVtree = this.renderer.renderMorph(this.morph);
    return this.morphVtree;
  }

  // VDOM interface
  init () {
    const domNode = createElement(this.renderMorph(), this.renderer.domEnvironment);
    domNode.appendChild(this.morph.svgPath);
    return domNode;
  }

  /**
   * Part of the vdom interface.
   * The function called when the widget is being updated.
   * @see{ @link https://github.com/Matt-Esch/virtual-dom/blob/master/docs/widget.md}
   */
  update (previous, domNode) {
    const oldTree = previous.morphVtree || this.renderMorph();
    const newTree = this.renderMorph();
    const patches = diff(oldTree, newTree);
    patch(domNode, patches);
    // if (this.morph.afterRenderHook) this.morph.afterRenderHook();
    return null;
  }

  // VDOM Interface
  destroy (domNode) {
    // no custom operation 
  }
}

export class SVGMorph extends Morph {
  static get properties () {
    return {
      extent: {
        after: ['svgUrl'],
        defaultValue: pt(800, 450),
        set (extent) {
          this.setProperty('extent', extent);
          if (this.svgPath) {
            this.svgPath.setAttribute('height', extent.y);
            this.svgPath.setAttribute('width', extent.x);
          }
        }
      },
      fill: { defaultValue: Color.transparent },
      borderColor: { defaultValue: Color.transparent },
      svgUrl: {
        defaultValue: '',
        set (url) {
          this.setProperty('svgUrl', url);
          this.setSVGPath();
        }

      },
      showControlPoints: {
        defaultValue: false
      }
    };
  }

  get isSVG () { return true; }

  render (renderer) {
    if (!this.svgPath) return;
    if (this._requestMasterStyling) {
      this.master && this.master.applyIfNeeded(true);
      this._requestMasterStyling = false;
    }
    this.node = new SVGVNode(this, renderer);
    return this.node;
  }

  setSVGPath () {
    fetch(this.svgUrl)
      .then((response) => response.text())
      .then((response) => {
        const svgStr = response;

        if (svgStr.indexOf('<svg') === -1) {
          return;
        }
        const span = this.env.domEnv.document.createElement('span');
        span.innerHTML = svgStr;
        const svgPath = span.getElementsByTagName('svg')[0];
        this.initializeSVGPath(svgPath);
      });
  }

  initializeSVGPath (svgPath) {
    this.svgPath = svgPath;
    const ratio = svgPath.getAttribute('height').replace(/\D/g, '') / svgPath.getAttribute('width').replace(/\D/g, '');
    this.width = this.height * ratio;
  }

  menuItems () {
    let s = new XMLSerializer();
    let str = s.serializeToString(this.svgPath).replace(/\/>/ig, '/>\n');

    const checked = Icon.textAttribute('check-square', { textStyleClasses: ['far'] });
    const unchecked = Icon.textAttribute('square', { textStyleClasses: ['far'] });

    return [
      [[...(this.showControlPoints ? checked : unchecked), ' control points'],
        () => this.showControlPoints = !this.showControlPoints],
      ['edit svg...', () => {
        new SVGWorkspace({
          center: $world.center,
          content: str,
          targetMorph: this
        }).activate();
        console.log(this.svgPath);
      }],
      { isDivider: true },
      ...super.menuItems()
    ];
  }
}