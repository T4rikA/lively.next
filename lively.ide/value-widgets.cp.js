import { component, part } from 'lively.morphic/components/core.js';
import { Color, rect, pt } from 'lively.graphics';
import { TilingLayout, ShadowObject, Icon, Label } from 'lively.morphic';
import { ValueScrubber } from 'lively.components/widgets.js';
import { NumberWidget } from './value-widgets.js';

const CaretButton = component({
  name: 'caret button',
  borderColor: Color.rgb(23, 160, 251),
  clipMode: 'hidden',
  extent: pt(20, 12),
  fill: Color.rgba(0, 0, 0, 0),
  nativeCursor: 'pointer',
  submorphs: [{
    type: Label,
    name: 'icon',
    borderColor: Color.rgba(0, 0, 0, 0),
    borderWidth: 1,
    fontColor: Color.rgb(127, 140, 141),
    nativeCursor: 'pointer',
    padding: rect(5, 0, -1, -1),
    reactsToPointer: false,
    textAndAttributes: Icon.textAttribute('sort-up')
  }]
});

const Scrubber = component({
  type: ValueScrubber,
  name: 'scrubber',
  baseFactor: 0.5,
  extent: pt(53.6, 24),
  fixedWidth: true,
  fontColor: Color.rgb(40, 116, 166),
  fontFamily: 'IBM Plex Sans',
  fontSize: 16,
  min: 0,
  padding: rect(6, 2, -6, -2),
  scaleToBounds: true,
  textAndAttributes: ['13', null]
});

// DefaultNumberWidget.openInWorld()
const DefaultNumberWidget = component({
  type: NumberWidget,
  name: 'default number widget',
  autofit: false,
  borderColor: Color.rgb(149, 165, 166),
  borderRadius: 4,
  dropShadow: new ShadowObject({ color: Color.rgba(0, 0, 0, 0.26) }),
  extent: pt(73.6, 25.7),
  fill: Color.rgb(253, 254, 254),
  fontColor: Color.rgb(178, 235, 242),
  fontFamily: 'IBM Plex Sans',
  fontSize: 16,
  clipMode: 'hidden',
  layout: new TilingLayout({
    align: 'center',
    axis: 'column',
    justifySubmorphs: false,
    orderByIndex: true
  }),
  padding: rect(6, 2, -6, -2),
  submorphs: [
    part(Scrubber, {
      name: 'value',
      extent: pt(53.6, 24)
    }),
    part(CaretButton, {
      name: 'up',
      submorphs: [{
        name: 'icon',
        padding: rect(6, 0, -2, -1),
        textAndAttributes: Icon.textAttribute('sort-up')
      }]
    }),
    part(CaretButton, { name: 'down', rotation: Math.PI })]
});

const DarkNumberWidget = component(DefaultNumberWidget, {
  name: 'dark number widget',
  fill: Color.rgb(66, 73, 73),
  submorphs: [{
    name: 'value',
    fontColor: Color.rgb(178, 235, 242)
  }]
});

// DarkNumberWidget.openInWorld()

export { DefaultNumberWidget, DarkNumberWidget };