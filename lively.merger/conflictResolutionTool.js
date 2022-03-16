import { pt, Color, rect } from 'lively.graphics';
import { Morph, HorizontalLayout, VerticalLayout, Label } from 'lively.morphic';
// import { Tree, TreeData } from 'lively.components';
import { DropDownSelector } from 'lively.components/widgets.js';
import { connect } from 'lively.bindings';

class ConflictListItem extends Morph {
  static get properties () {
    return {
      name: {
        defaultValue: 'Merge Conflict'
      },
      labels: {
        defaultValue: {
          property: new Label({ textString: 'Property: ' }),
          a: new Label({ textString: 'A' }),
          b: new Label({ textString: 'B' })
        }
      },
      // This should be proper trees. But labels work for now.
      propertyTrees: {
        defaultValue: {
          // a: new Tree({
          //   treeData: new TreeData(null),
          //   ...this.treeStyle,
          //   name: 'propertyTree'
          // }),
          // b: new Tree({
          //   treeData: new TreeData(null),
          //   ...this.treeStyle,
          //   name: 'propertyTree'
          // })
          a: new Label(),
          b: new Label()
        }
      },
      mergeConflict: {
        after: ['labels', 'propertyTrees', 'ui'],
        set (obj) {
          this.setProperty('mergeConflict', obj);

          if (obj) {
            this.labels.property.textString = `Property: ${obj.property}`;

            // this.propertyTrees.a.treeData = new TreeData(obj.a);
            // this.propertyTrees.b.treeData = new TreeData(obj.b);
            this.propertyTrees.a.textString = JSON.stringify(obj.a);
            this.propertyTrees.b.textString = JSON.stringify(obj.b);
          } else {
            this.labels.property.textString = 'Property: ';

            // this.propertyTrees.a.treeData = new TreeData(null);
            // this.propertyTrees.b.treeData = new TreeData(null);
            this.propertyTrees.a.textString = '';
            this.propertyTrees.b.textString = '';
          }
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

  get isListItem () {
    return true;
  }

  get string () {
    return '';
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
      layout: new VerticalLayout({
        spacing: 5,
        align: 'center',
        padding: rect(5, 5, 5, 5)
      })
    };
  }

  get property () {
    return this.mergeConflict.property();
  }

  get selectedValue () {
    return this.valueSelector.selectedValue === this.labels.a.textString ? this.mergeConflict.a : this.mergeConflict.b;
  }

  build () {
    this.extent = pt(625, 90);
    this.fill = Color.gray;

    this.layout = new HorizontalLayout({
      spacing: 5,
      align: 'top',
      padding: rect(5, 5, 5, 5)
    });

    this.valueSelector = new DropDownSelector({
      extent: pt(160, 30),
      borderstyle: 'solid',
      borderwidth: 1,
      selectedValue: undefined,
      values: [
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

  constructor (args) {
    super(args);
    if (args.mergeConflict) {
      this.mergeConflict = args.mergeConflict;
    }
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

export class ConflictResolutionTool extends Morph {
  static get properties () {
    return {
      conflictListItems: {
        after: ['mergeConflicts'],
        defaultValue: []
      },
      mergeConflicts: {
        defaultValue: [],
        set (arr) {
          this.setProperty('mergeConflicts', arr);

          this.updateConflictListItems(arr);

          const list = this.get('conflict list');
          if (list) {
            list.submorphs = this.conflictListItems;
          }
        }
      },
      resultCallback: {
        defaultValue: (result, err) => { console.log(result, err); }
      },
      ui: {
        after: ['conflictListItems'],
        initialize () {
          this.ui = {};
          this.build();
        }
      }
    };
  }

  constructor (props) {
    super(props);
    if (props.mergeConflicts) {
      this.mergeConflicts = props.mergeConflicts;
    }
    if (props.resultCallback) {
      this.resultCallback = props.resultCallback;
    }
  }

  build () {
    this.extent = pt(650, 500);

    this.layout = new VerticalLayout({
      spacing: 5,
      align: 'left',
      padding: rect(5, 5, 5, 5)
    });

    this.submorphs = [
      {
        layout: new VerticalLayout({ spacing: 5, direction: 'top' }),
        name: 'conflict list',
        submorph: this.conflictListItems
      }, {
        layout: new HorizontalLayout({ spacing: 5, direction: 'centered' }),
        submorphs: [
          { type: 'button', name: 'ok button', label: 'OK' },
          { type: 'button', name: 'cancel button', label: 'Cancel' }
        ]
      }
    ];
  }

  updateConflictListItems (conflicts) {
    this.conflictListItems.forEach(listItem => listItem.abandon());
    this.conflictListItems = conflicts.map(conflict => new ConflictListItem({ mergeConflict: conflict }));
  }

  onLoad () {
    connect(this.get('ok button'), 'fire', this, 'apply');
    connect(this.get('cancel button'), 'fire', this, 'cancel');
  }

  apply () {
    if (this.validate()) {
      const results = this.getResultsFromListItems();
      this.resultCallback(results);
      if (this.owner && this.owner.isWindow) {
        this.owner.close();
      }
    } else {
      if (this.owner && this.owner.isWindow) {
        this.owner.setStatusMessage('Not all conflicts have been resolved.');
      } else {
        $world.setStatusMessage('Not all conflicts have been resolved');
      }
    }
  }

  cancel () {
    this.resultCallback(null, 'Manual merge aborted');
    if (this.owner && this.owner.isWindow) {
      this.owner.close();
    }
  }

  validate () {
    let result = true;
    this.conflictListItems.forEach(listItem => {
      const tmp = listItem.validate();
      result = result && tmp;
    });
    return result;
  }

  getResultsFromListItems () {
    const results = {};
    this.conflictListItems.forEach(listItem => {
      results[listItem.propery] = listItem.selectedValue;
    });
    return results;
  }
}

export async function conflictResolutionPrompt (mergeConflicts) {
  return new Promise(function (resolve, reject) {
    (new ConflictResolutionTool({
      mergeConflicts: mergeConflicts,
      resultCallback: (result, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    })).openInWindow();
  });
}
