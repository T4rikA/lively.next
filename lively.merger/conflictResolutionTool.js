import { pt, rect } from 'lively.graphics';
import { Morph, Label, TilingLayout } from 'lively.morphic';
import { PropertyTree } from 'lively.ide/js/inspector/context.js';

export class ConflictListItem extends Morph {
  static get properties () {
    return {
      name: {
        defaultValue: 'Merge Conflict'
      },
      labels: {
        defaultValue: {
          property: new Label('Property'),
          base: new Label('Base'),
          a: new Label('A'),
          b: new Label('B')
        }
      },
      trees: {
        defaultValue: {
          base: new PropertyTree({ treeData: {} }),
          a: new PropertyTree({ treeData: {} }),
          b: new PropertyTree({ treeData: {} })
        }
      },
      mergeConflict: {
        after: ['labels', 'trees'],
        set (obj) {
          this.setProperty('mergeConflict', obj);

          this.labels.property.textString = `Property: ${obj.property}`;
          
          this.trees.base.treeData = obj.base;
          this.trees.a.treeData = obj.a;
          this.trees.b.treeData = obj.b;
        }
      },
      ui: {
        after: ['labels', 'trees'],
        initialize () {
          this.ui = {};
          this.build();
        }
      }
    };
  }

  build () {
    this.extent = pt(200, 50);

    this.addMorph(this.labels.property);
    this.addMorph(this.labels.base);
    this.addMorph(this.trees.base);
    this.addMorph(this.labels.a);
    this.addMorph(this.trees.a);
    this.addMorph(this.labels.b);
    this.addMorph(this.trees.b);
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
  
  // 2. get the content element
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

export class ConflictResolutionTool extends Morph {
  static get properties () {
    return {
      name: {
        defaultValue: 'Conflict Resolution Tool'
      },
      conflictListItems: {
        defaultValue: []
      },
      ui: {
        initialize () {
          this.ui = {};
          this.build();
        }
      },
      mergeConflicts: {
        after: ['submorphs'],
        defaultValue: [],
        set (obj) {
          this.setProperty('mergeConflicts', obj);
          this.buildUiFromMergeConflicts(obj);
        }
      }
    };
  }

  buildUiFromMergeConflicts (mergeConflicts) {
    if (!mergeConflicts) return;

    this.conflictListItems.forEach(listItem => listItem.abandon());
    this.conflictListItems = mergeConflicts.map(mergeConflict => new ConflictListItem({ mergeConflict }));
    this.conflictListItems.forEach(listItem => this.addMorph(listItem));
  }

  build () {
    this.extent = pt(500, 600);
    this.layout = new TilingLayout({
      spacing: 5,
      align: 'center',
      padding: rect(5, 5, 5, 5)
    });
  }
}
