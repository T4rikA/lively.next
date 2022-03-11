import { pt, Color, rect } from 'lively.graphics';
import { Morph, HorizontalLayout, VerticalLayout, Label } from 'lively.morphic';
import { Tree, MorphList, TreeData } from 'lively.components';
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
          a: new Label({ textString: 'A' }),
          b: new Label({ textString: 'B' })
        }
      },
      propertyTrees: {
        defaultValue: {
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

            this.propertyTrees.a.treeData = new TreeData(obj.a);
            this.propertyTrees.b.treeData = new TreeData(obj.b);
          } else {
            this.labels.property.textString = 'Property: ';

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
      layout: new VerticalLayout({
        spacing: 5,
        align: 'center',
        padding: rect(5, 5, 5, 5)
      })
    };
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
          this.update();
        }
      },
      ui: {
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
  }

  build () {
    this.extent = pt(650, 500);

    this.layout = new VerticalLayout({
      spacing: 5,
      align: 'left',
      padding: rect(5, 5, 5, 5)
    });

    this.submorphs = [
      this.buildConflictList(),
      this.buildApplyButton(),
      this.buildCancelButton()
    ];
  }

  buildConflictList () {
    this.conflictListItems = this.mergeConflicts.map(conflict => new ConflictListItem({ mergeConflict: conflict }));
    const list = new MorphList({ extent: pt(650, 400), items: this.conflictListItems });
    return list;
  }

  buildApplyButton () {
    if (this.validate()) {
      // merge accordingly
      // close window      
    } else {
      // show error hint
    }
  }

  buildCancelButton () {
    // cancel everyting
  }

  validate () {
    let result = true;
    this.conflictListItems.forEach(listItem => {
      const tmp = listItem.validate();
      result = result && tmp;
    });
    return result;
  }
}

export function conflictResolutionPrompt (mergeConflicts) {
  (new ConflictResolutionTool(mergeConflicts)).openInWorld();
}
