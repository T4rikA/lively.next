import { component } from 'lively.morphic/components/core.js';
import { Color, rect, pt } from 'lively.graphics';
import { TilingLayout, Text, Icon, Label } from 'lively.morphic';
import { CommentGroupModel, CommentModel } from '../comment.js';

const CommentGroup = component({
  name: 'comment group',
  defaultViewModel: CommentGroupModel,
  layout: new TilingLayout({
    axis: 'column',
    axisAlign: 'center',
    orderByIndex: true,
    wrapSubmorphs: false,
    resizePolicies: [
      ['header', { height: 'fixed', width: 'fill' }],
      ['comment container', { height: 'fill', width: 'fill' }]
    ]
  }),
  fill: Color.rgb(251, 252, 252),
  borderWidth: 1,
  borderColor: Color.rgb(189, 195, 199),
  borderRadius: 5,
  extent: pt(270.0, 80.0),
  submorphs: [
    { 
      name: 'header',
      layout: new TilingLayout({
        orderByIndex: true,
        justifySubmorphs: 'spaced',
        wrapSubmorphs: false,
        resizingPolicies: [
          ['container spacer', { height: 'fill', width: 'fill' }]
        ]
      }),
      height: 32,
      submorphs: [
        { 
          name: 'collapse indicator',
          type: Label,
          layout: new TilingLayout({
            orderByIndex: true
          }),
          textAndAttributes: Icon.textAttribute('caret-down'),
          padding: rect(10, 12, -1, -4)
        },
        { 
          name: 'group name label',
          type: Label,
          textString: 'aGroupName',
          fontSize: 15,
          padding: rect(0, 10, 0, -4)
                    
        },
        {
          name: 'container spacer',
          fill: Color.transparent
        },        
        { 
          name: 'comment count label',
          type: Label,
          fontSize: 15,
          textString: '999',
          padding: rect(0, 10, 0, -4)
        }
      ]
    },
    { 
      name: 'comment container',
      layout: new TilingLayout({
        axis: 'column',
        axisAlign: 'center',
        orderByIndex: true,
        wrapSubmorphs: false,
        padding: 5,
        hugContentsVertically: true 
      })
    }]
  
});

const commentButtonEnabled = component({
  type: Label,
  fontColor: Color.rgb(127, 140, 141),
  fontSize: 15,
  nativeCursor: 'pointer',
  halosEnabled: false  
});

const commentButtonDisabled = component({
  fontColor: Color.rgba(127, 140, 141, 0.4),
  nativeCursor: 'default'
});

const commentLabel = component({
  type: Label,
  fontColor: Color.rgb(112, 123, 124),
  halosEnabled: false,
  readOnly: true
});

// part(Comment).openInWorld()
// Comment.openInWorld()
const CommentView = component({
  name: 'comment',
  defaultViewModel: CommentModel,
  layout: new TilingLayout({
    axis: 'column',
    axisAlign: 'center',
    orderByIndex: true,
    wrapSubmorphs: false,
    padding: 5,
    hugContentsVertically: true,
    resizePolicies: [
      ['header', { height: 'fixed', width: 'fill' }]
    ]
  }),
  extent: pt(265.0, 134.0),
  fill: Color.rgb(251, 252, 252),
  borderWidth: 1,
  borderColor: { top: Color.rgb(189, 195, 199) },
  submorphs: [
    {
      name: 'header',
      height: 40,
      halosEnabled: false,
      layout: new TilingLayout({  
        resizePolicies: [
          ['text container', { height: 'fill', width: 'fill' }]
        ]
      }),
      submorphs: [
        // The contents of this `text container` have been autogenerated with convertToSpec from an old master component (lh 2022-01-12)
        // The absolute positioning was the reason why this was necessary
        // Nicer would be to have something along the lines of a GridLayout to position the four Labels 2x2 
        {
          name: 'text container',
          extent: pt(177.2, 17),
          fill: Color.rgba(0, 0, 0, 0),
          fixedWidth: true,
          fontColor: Color.rgb(112, 123, 124),
          halosEnabled: false,
          lineWrapping: true,
          nativeCursor: 'default',
          position: pt(0.4, 13.5),
          readOnly: true,
          submorphs: [
            {
              type: Label,
              name: 'user name label',
              extent: pt(57, 17),
              position: pt(40, 8.4),
              master: commentLabel,
              textString: 'user name'
            },
            {
              type: Label,
              name: 'date label',
              extent: pt(120, 17),
              position: pt(39.6, -7.2),
              master: commentLabel,
              textString: '2022-01-12'
            }, 
            {
              type: Label,
              name: 'from label',
              extent: pt(28, 17),
              position: pt(3.6, -7.2),
              master: commentLabel,
              textString: 'From'
            }, 
            {
              type: Label,
              name: 'by label',
              extent: pt(14, 17), 
              position: pt(4.4, 7.8),
              master: commentLabel,
              textString: 'By'
            }]
        },
        {
          name: 'button container',
          halosEnbled: false,
          layout: new TilingLayout({
            axis: 'column',
            spacing: 8,
            padding: 8,
            hugContents: true
          }),
          submorphs: [
            {
              type: Label,
              name: 'delete button',
              textAndAttributes: Icon.textAttribute('trash'),
              master: commentButtonEnabled,
              tooltip: 'Delete Comment'
            },
            {
              type: Label,
              name: 'edit save button',
              textAndAttributes: Icon.textAttribute('pencil-alt'),
              master: commentButtonEnabled,
              tooltip: 'Edit Comment'
            },
            {
              type: Label,
              name: 'resolve button',
              textAndAttributes: Icon.textAttribute('check'),
              master: commentButtonEnabled,
              tooltip: 'Resolve Comment'
            }
          ]
        }
        
      ]
    },
    // TODO: This showcases a layouting bug which is triggered when the `Comment` needs to grow vertically because lines have been added to the text inside of the `comment text field`
    // Hovering in and out of the `Comment` will lead to a short flickering of it, as the Morph figures out of high it should be
    // lh 2021-01-12
    {
      name: 'comment text field',
      type: Text,
      textString: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: Color.rgb(191, 201, 202),
      lineWrapping: true,
      fixedWidth: true,
      padding: 5,
      halosEnabled: false,
      width: 255,
      readOnly: true,
      fill: Color.rgb(251, 252, 252),
      borderStyle: 'none'
    }]
});

export { CommentGroup, CommentView, commentButtonEnabled, commentButtonDisabled };