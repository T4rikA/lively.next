import { pt, Color, rect } from 'lively.graphics';
import { Morph, config, Label, TilingLayout } from 'lively.morphic';
import { Tree } from 'lively.components';
import { InspectionTree } from 'lively.ide/js/inspector/context.js';

export class ConflictListItem extends Morph {
  static get properties () {
    return {
      name: {
        defaultValue: 'Merge Conflict'
      },
      labels: {
        defaultValue: {
          property: new Label({ textString: 'Property' }),
          base: new Label({ textString: 'Base' }),
          a: new Label({ textString: 'A' }),
          b: new Label({ textString: 'B' })
        }
      },
      treeStyle: {
        defaultValue: {
          extent: pt(200, 50),
          draggable: false,
          borderWidth: 1,
          borderColor: Color.gray,
          fontSize: 14,
          fontFamily: config.codeEditor.defaultStyle.fontFamily
        }
      },
      propertyTrees: {
        after: ['treeStyle'],
        defaultValue: {
          base: new Tree({ 
            treeData: InspectionTree.forObject(null, this), 
            ...this.treeStyle,
            name: 'propertyTree' 
          }),
          a: new Tree({ 
            treeData: InspectionTree.forObject(null, this), 
            ...this.treeStyle, 
            name: 'propertyTree' 
          }),
          b: new Tree({ 
            treeData: InspectionTree.forObject(null, this), 
            ...this.treeStyle,
            name: 'propertyTree' 
          })
        }
      },
      mergeConflict: {
        after: ['labels', 'propertyTrees', 'ui'],
        set (obj) {
          this.setProperty('mergeConflict', obj);

          this.labels.property.textString = `Property: ${obj.property}`;

          this.propertyTrees.base.treeData = InspectionTree.forObject(obj.base);
          this.propertyTrees.a.treeData = InspectionTree.forObject(obj.a);
          this.propertyTrees.b.treeData = InspectionTree.forObject(obj.b);

          Object.values(this.propertyTrees).forEach(tree => tree.makeDirty());
        }
      },
      ui: {
        after: ['labels', 'propertyTrees'],
        initialize () {
          this.ui = {};
          this.build();
        }
      }
    };
  }

  build () {
    this.extent = pt(800, 90);
    this.fill = Color.gray;
    this.borderColor = Color.red;
    this.borderWidth = 1;

    this.layout = new TilingLayout({
      spacing: 5,
      align: 'left',
      padding: rect(5, 5, 5, 5)
    });

    this.submorphs = [
      this.labels.property, 
      {
        name: 'base value',
        submorphs: [
          this.labels.base,
          this.propertyTrees.base
        ]  
      }, {
        name: 'a value',
        submorphs: [
          this.labels.a,
          this.propertyTrees.a
        ]
      }, {
        name: 'b value',
        submorphs: [
          this.labels.b,
          this.propertyTrees.b
        ]
      }];
  }

  get isConflictListItem () {
    return true;
  }

  constructor (mergeConflict) {
    super();
    this.mergeConflict = mergeConflict;
  }

  validate () {
    // TODO
    return true;
  }
}

export function conflictResolutionPrompt (mergeConflicts) {
  // 1. create empty dialog
  const dialog = new Morph();
  
  // 2. get the content element from the dialog
  const contentElement = new Morph();
  dialog.addMorph(contentElement);
  
  // 3. for each merge conflict create a conflict list item
  // 4. append the list items to the content element
  mergeConflicts.forEach(conflict => contentElement.addMorph(new ConflictListItem(conflict)));
  
  // 5. set ok button to the validate function
  const validator = () => {
    let result = true;
    this.conflictListItems.forEach(listItem => {
      const tmp = listItem.validate();
      result = result && tmp;      
    });
    return result;
  };
  
  // 6. set cancel button to close th dialog and return false

  // 7. return the dialog
  return dialog;
}
