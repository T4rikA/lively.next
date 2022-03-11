import { pt, Color, rect } from 'lively.graphics';
import { Morph, Label, TilingLayout } from 'lively.morphic';
import { Tree, TreeData } from 'lively.components';
import { DropDownSelector } from 'lively.components/widgets.js';

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
      propertyTrees: {
        defaultValue: {
          base: new Tree({
            treeData: new TreeData(null),
            ...this.treeStyle,
            name: 'propertyTree'
          }),
          a: new Tree({
            treeData: new TreeData(null),
            ...this.treeStyle,
            name: 'propertyTree'
          }),
          b: new Tree({
            treeData: new TreeData(null),
            ...this.treeStyle,
            name: 'propertyTree'
          })
        }
      },
      mergeConflict: {
        after: ['labels', 'propertyTrees', 'ui'],
        set (obj) {
          this.setProperty('mergeConflict', obj);

          if (obj) {
            this.labels.property.textString = `Property: ${obj.property}`;

            this.propertyTrees.base.treeData = new TreeData(obj.base);
            this.propertyTrees.a.treeData = new TreeData(obj.a);
            this.propertyTrees.b.treeData = new TreeData(obj.b);
          } else {
            this.labels.property.textString = 'Property: ';

            this.propertyTrees.base.treeData = new TreeData(null);
            this.propertyTrees.a.treeData = new TreeData(null);
            this.propertyTrees.b.treeData = new TreeData(null);
          }

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

  get treeStyle () {
    return {
      extent: pt(160, 30),
      border: { width: 1, color: Color.gray }
    };
  }

  get valueGroupStyle () {
    return {
      extent: pt(200, 70),
      layout: new TilingLayout({
        spacing: 5,
        align: 'top',
        padding: rect(5, 5, 5, 5),
        axis: 'column'
      })
    };
  }

  build () {
    this.extent = pt(850, 90);
    this.fill = Color.gray;

    this.layout = new TilingLayout({
      spacing: 5,
      align: 'left',
      padding: rect(5, 5, 5, 5),
      axis: 'row'
    });

    this.valueSelector = new DropDownSelector({
      selectedValue: null,
      extent: pt(160, 30),
      values: [
        this.labels.base.textString,
        this.labels.a.textString,
        this.labels.b.textString
      ]
    });

    this.submorphs = [{
      name: 'General Information',
      ...this.valueGroupStyle,
      submorphs: [
        this.labels.property,
        this.valueSelector
      ]
    }, {
      name: 'base value',
      ...this.valueGroupStyle,
      submorphs: [
        this.labels.base,
        this.propertyTrees.base
      ]
    }, {
      name: 'a value',
      ...this.valueGroupStyle,
      submorphs: [
        this.labels.a,
        this.propertyTrees.a
      ]
    }, {
      name: 'b value',
      ...this.valueGroupStyle,
      submorphs: [
        this.labels.b,
        this.propertyTrees.b
      ]
    }];
  }

  get isConflictListItem () {
    return true;
  }

  constructor (args) {
    super(args);
    this.mergeConflict = args.mergeConflict;
  }

  validate () {
    const success = !!this.valueSelector.selectedValue;

    if (!success) {
      this.border = { width: 2, color: Color.red };
    } else {
      this.border = { width: 2, color: Color.green };
    }

    return success;
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
