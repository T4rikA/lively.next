import { pt, rect, Color } from 'lively.graphics';
import { Morph, HorizontalLayout, VerticalLayout, Label } from 'lively.morphic';
import { DropDownSelector } from 'lively.components/widgets.js';
import { connect } from 'lively.bindings';
import { Button } from 'lively.components';

export class ConflictListItem extends Morph {
  static get properties () {
    return {
      name: {
        defaultValue: 'aConflictListItem'
      },
      labels: {
        initialize () {
          this.labels = {
            property: new Label({ textString: 'Property: ' }),
            a: new Label({ textString: 'A' }),
            b: new Label({ textString: 'B' })
          };
        }
      },
      propertyDisplays: {
        initialize () {
          this.propertyDisplays = {
            a: new Label(),
            b: new Label()
          };
        }
      },
      ui: {
        after: ['labels', 'propertyDisplays'],
        initialize () {
          this.ui = {};
          this.build();
        }
      },
      mergeConflict: {
        after: ['labels', 'propertyDisplays', 'ui'],
        set (obj) {
          this.setProperty('mergeConflict', obj);
          this.updateLabels();
        }
      }
    };
  }

  buildvalueGroupStyle () {
    return {
      extent: pt(105, 50),
      layout: new VerticalLayout({
        spacing: 5,
        align: 'left',
        axisAlign: 'center',
        padding: rect(5, 5, 5, 5)
      })
    };
  }

  get conflictProperty () {
    return this.mergeConflict.property;
  }

  get selectedValue () {
    return this.valueSelector.selectedValue === this.labels.a.textString ? this.mergeConflict.a : this.mergeConflict.b;
  }

  build () {
    this.extent = pt(340, 65);
    this.fill = Color.gray;

    this.layout = new HorizontalLayout({
      spacing: 5,
      align: 'center',
      axisAlign: 'left',
      padding: rect(5, 5, 5, 5)
    });

    this.valueSelector = new DropDownSelector({
      extent: pt(60, 30),
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
      ...this.buildvalueGroupStyle(),
      submorphs: [
        this.labels.property,
        this.valueSelector
      ]
    }, {
      name: 'a value',
      ...this.buildvalueGroupStyle(),
      submorphs: [
        this.labels.a,
        this.propertyDisplays.a
      ]
    }, {
      name: 'b value',
      ...this.buildvalueGroupStyle(),
      submorphs: [
        this.labels.b,
        this.propertyDisplays.b
      ]
    }];
  }

  updateLabels () {
    if (this.mergeConflict) {
      this.labels.property.textString = `Property: ${this.mergeConflict.property}`;
      this.propertyDisplays.a.textString = JSON.stringify(this.mergeConflict.a);
      this.propertyDisplays.b.textString = JSON.stringify(this.mergeConflict.b);
    } else {
      this.labels.property.textString = 'Property: ';
      this.propertyDisplays.a.textString = '';
      this.propertyDisplays.b.textString = '';
    }
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
        defaultValue: []
      },
      mergeConflicts: {
        after: ['conflictListItems', 'ui'],
        defaultValue: [],
        set (arr) {
          this.setProperty('mergeConflicts', arr);

          this.conflictListItems.forEach(listItem => listItem.abandon());
          this.conflictListItems = arr.map(conflict => new ConflictListItem({ mergeConflict: conflict }));

          const list = this.get('conflict list');
          if (list) {
            list.submorphs = this.conflictListItems;
          }
        }
      },
      buttons: {
        initialize () {
          this.buildButtons();
        }
      },
      resultCallback: {
        defaultValue: (result, err) => { console.log(result, err); }
      },
      ui: {
        after: ['conflictListItems', 'buttons'],
        initialize () {
          this.ui = {};
          this.build();
        }
      }
    };
  }

  constructor (args) {
    super(args);
    if (args.mergeConflicts) {
      this.mergeConflicts = args.mergeConflicts;
    }
    if (args.resultCallback) {
      this.resultCallback = args.resultCallback;
    }
  }

  buildButtons () {
    this.buttons = {
      ok: new Button({
        name: 'ok button',
        label: 'OK',
        extent: pt(100, 30)
      }),
      cancel: new Button({
        name: 'cancel button',
        label: 'Cancel',
        extent: pt(100, 30)
      })
    };
  }

  build () {
    this.extent = pt(390, 350);
    this.layout = new VerticalLayout({
      spacing: 5,
      padding: rect(5, 5, 5, 5),
      align: 'left',
      axisAlign: 'center',
      autoResize: false
    });

    this.submorphs = [
      {
        extent: pt(380, 285),
        layout: new VerticalLayout({
          spacing: 5,
          align: 'left',
          axisAlign: 'center',
          padding: rect(5, 5, 5, 5),
          autoResize: false
        }),
        clipMode: 'auto',
        name: 'conflict list',
        submorphs: this.conflictListItems
      }, {
        extent: pt(375, 50),
        name: 'button bar',
        layout: new HorizontalLayout({
          spacing: 5,
          align: 'center',
          axisAlign: 'center',
          padding: rect(5, 5, 5, 5)
        }),
        submorphs: [
          this.buttons.ok,
          this.buttons.cancel
        ]
      }
    ];
  }

  onLoad () {
    connect(this.buttons.ok, 'fire', this, 'apply');
    connect(this.buttons.cancel, 'fire', this, 'cancel');
  }

  apply () {
    if (this.validate()) {
      const results = this.getResultsFromListItems();
      this.resultCallback(results);
      this.closeWindow();
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
    this.closeWindow();
  }

  closeWindow () {
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
      results[listItem.conflictProperty] = listItem.selectedValue;
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
