import { pt, rect, Color } from 'lively.graphics';
import { Morph, TilingLayout } from 'lively.morphic';

const CONSTANTS = {
  WIDGET_EXTENT: pt(150, 30)
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
      mergeConflict: {
        set (obj) {
          this.setProperty('mergeConflict', obj);
        }
      }
    };
  }
}

export class ConflictResolutionTool extends Morph {
  static get properties () {
    return {
      name: {
        defaultValue: 'Conflict Resolution Tool'
      },
      // ui: {
      //   after: ['mergeConflicts'],
      //   initialize () {
      //     this.ui = {};
      //     this.build();
      //   }
      // },
      mergeConflicts: {
        after: ['submorphs'],
        defaultValue: [],
        set (obj) {
          this.setProperty('mergeConflicts', obj);
        },
        initialize () {
          debugger;
          this.submorphs = this.mergeConflicts.map(mergeConflict => new ConflictListItem({ mergeConflict }));
        }
      }
    };
  }

  // build () {
  //   this.extent = pt(1000, 800);
  //   this.layout = new TilingLayout({
  //     spacing: 100,
  //     align: 'center',
  //     padding: rect(5, 5, 5, 5)
  //   });
  // }
}
