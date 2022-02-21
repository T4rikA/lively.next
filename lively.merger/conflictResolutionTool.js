import { pt, rect, Color } from 'lively.graphics';
import { Morph, Label, TilingLayout } from 'lively.morphic';
import { DropDownSelector } from 'lively.components/widgets.js';

const CONSTANTS = {
  WIDGET_EXTENT: pt(150, 30),
  LIST_ITEM_OFFSET: 10,
  LIST_ITEM_HEIGHT: 20
};

const COLOR_SCHEME = {
  BORDER: Color.rgba(97, 97, 97, 1)
};

class ConflictListItem extends Morph {
  static get properties () {
    return {
      name: {
        defaultValue: 'Merge Conflict'
      },
      labelNames: {
        defaultValue: {
          base: 'Base',
          a: 'A',
          b: 'B'
        }
      },
      ui: {
        initialize () {
          this.ui = {};
          this.build();
        }
      },
      labels: {
        after: ['ui', 'labelNames'],
        initialize () {
          this.labels = {
            property: new Label({ textString: 'Property: ' }),
            base: new Label({ textString: `${this.labelNames.base.toString()}: ` }),
            a: new Label({ textString: `${this.labelNames.a.toString()}: ` }),
            b: new Label({ textString: `${this.labelNames.b.toString()}: ` })
          };

          Object.values(this.labels).forEach(label => this.addMorph(label));
        }
      },
      versionSelector: {
        after: [
          'ui',
          'labelNames',
          'labels'
        ],
        initialize () {
          this.versionSelector = this.buildVersionSelector();
          this.addMorph(this.versionSelector);
        }
      },
      mergeConflict: {
        after: ['labelNames', 'labels'],
        set (obj) {
          this.setProperty('mergeConflict', obj);
          
          this.labels.property.textString = `Property: ${obj.property}`;
          this.labels.base.textString = `${this.labelNames.base}: ${obj.base}`;
          this.labels.a.textString = `${this.labelNames.a}: ${obj.a}`;
          this.labels.b.textString = `${this.labelNames.b}: ${obj.b}`;
        }
      }
    };
  }

  build () {
    this.extent = pt(500, CONSTANTS.LIST_ITEM_HEIGHT);
    this.layout = new TilingLayout({
      spacing: 50,
      align: 'center',
      padding: rect(5, 5, 5, 5)
    });
  }

  buildVersionSelector () {
    const dropdown = new DropDownSelector({
      name: 'value selector dropdown',
      fontColor: this.fontColor,
      borderStyle: 'solid',
      borderWidth: 1,
      tooltip: 'Select the value to be used in the merged version'
    });
    dropdown.dropDownLabel.fontSize = 14;
    dropdown.values = Object.values(this.labelNames);
    dropdown.selectedValue = undefined;
    return dropdown;
  }

  validate () {
    if (this.versionSelector.selectedValue) {
      this.versionSelector.borderColor = Color.green;
    } else {
      this.versionSelector.borderColor = Color.red;
    }
    
    return !!this.versionSelector.selectedValue;
  }
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

  validate () {
    let result = true;
    this.conflictListItems.forEach(listItem => result = result && listItem.validate());
    return result;
  }
}
