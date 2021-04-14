// generated from NgTableTemplateTS
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, Inject, Optional } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatButton } from '@angular/material/button'

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { DialogData } from '../front-repo.service'
import { SelectionModel } from '@angular/cdk/collections';

const allowMultiSelect = true;

import { Router, RouterState } from '@angular/router';
import { VisualTrackDB } from '../visualtrack-db'
import { VisualTrackService } from '../visualtrack.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'

// generated table component
@Component({
  selector: 'app-visualtracks-table',
  templateUrl: './visualtracks-table.component.html',
  styleUrls: ['./visualtracks-table.component.css'],
})
export class VisualTracksTableComponent implements OnInit {

  // used if the component is called as a selection component of VisualTrack instances
  selection: SelectionModel<VisualTrackDB>;
  initialSelection = new Array<VisualTrackDB>();

  // the data source for the table
  visualtracks: VisualTrackDB[];

  // front repo, that will be referenced by this.visualtracks
  frontRepo: FrontRepo

  // displayedColumns is referenced by the MatTable component for specify what columns
  // have to be displayed and in what order
  displayedColumns: string[];

  constructor(
    private visualtrackService: VisualTrackService,
    private frontRepoService: FrontRepoService,

    // not null if the component is called as a selection component of visualtrack instances
    public dialogRef: MatDialogRef<VisualTracksTableComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,

    private router: Router,
  ) {
    // https://stackoverflow.com/questions/54627478/angular-7-routing-to-same-component-but-different-param-not-working
    // this is for routerLink on same component when only queryParameter changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // observable for changes in structs
    this.visualtrackService.VisualTrackServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.getVisualTracks()
        }
      }
    )
    if (dialogData == undefined) {
      this.displayedColumns = ['ID', 'Edit', 'Delete', // insertion point for columns to display
        "Lat",
        "Lng",
        "Heading",
        "Level",
        "Speed",
        "VerticalSpeed",
        "Name",
        "VisualColorEnum",
        "VisualLayer",
        "VisualIcon",
        "Display",
        "DisplayTrackHistory",
        "DisplayLevelAndSpeed",
      ]
    } else {
      this.displayedColumns = ['select', 'ID', // insertion point for columns to display
        "Lat",
        "Lng",
        "Heading",
        "Level",
        "Speed",
        "VerticalSpeed",
        "Name",
        "VisualColorEnum",
        "VisualLayer",
        "VisualIcon",
        "Display",
        "DisplayTrackHistory",
        "DisplayLevelAndSpeed",
      ]
      this.selection = new SelectionModel<VisualTrackDB>(allowMultiSelect, this.initialSelection);
    }

  }

  ngOnInit(): void {
    this.getVisualTracks()
  }

  getVisualTracks(): void {
    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo
        console.log("front repo pull returned")

        this.visualtracks = this.frontRepo.VisualTracks_array;

        // insertion point for variables Recoveries

        // in case the component is called as a selection component
        if (this.dialogData != undefined) {
          this.visualtracks.forEach(
            visualtrack => {
              let ID = this.dialogData.ID
              let revPointer = visualtrack[this.dialogData.ReversePointer]
              if (revPointer.Int64 == ID) {
                this.initialSelection.push(visualtrack)
              }
            }
          )
          this.selection = new SelectionModel<VisualTrackDB>(allowMultiSelect, this.initialSelection);
        }
      }
    )
  }

  // newVisualTrack initiate a new visualtrack
  // create a new VisualTrack objet
  newVisualTrack() {
  }

  deleteVisualTrack(visualtrackID: number, visualtrack: VisualTrackDB) {
    // list of visualtracks is truncated of visualtrack before the delete
    this.visualtracks = this.visualtracks.filter(h => h !== visualtrack);

    this.visualtrackService.deleteVisualTrack(visualtrackID).subscribe(
      visualtrack => {
        this.visualtrackService.VisualTrackServiceChanged.next("delete")

        console.log("visualtrack deleted")
      }
    );
  }

  editVisualTrack(visualtrackID: number, visualtrack: VisualTrackDB) {

  }

  // display visualtrack in router
  displayVisualTrackInRouter(visualtrackID: number) {
    this.router.navigate( ["visualtrack-display", visualtrackID])
  }

  // set editor outlet
  setEditorRouterOutlet(visualtrackID: number) {
    this.router.navigate([{
      outlets: {
        editor: ["visualtrack-detail", visualtrackID]
      }
    }]);
  }

  // set presentation outlet
  setPresentationRouterOutlet(visualtrackID: number) {
    this.router.navigate([{
      outlets: {
        presentation: ["visualtrack-presentation", visualtrackID]
      }
    }]);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.visualtracks.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.visualtracks.forEach(row => this.selection.select(row));
  }

  save() {

    let toUpdate = new Set<VisualTrackDB>()

    // reset all initial selection of visualtrack that belong to visualtrack through Anarrayofb
    this.initialSelection.forEach(
      visualtrack => {
        visualtrack[this.dialogData.ReversePointer].Int64 = 0
        visualtrack[this.dialogData.ReversePointer].Valid = true
        toUpdate.add(visualtrack)
      }
    )

    // from selection, set visualtrack that belong to visualtrack through Anarrayofb
    this.selection.selected.forEach(
      visualtrack => {
        console.log("selection ID " + visualtrack.ID)
        let ID = +this.dialogData.ID
        visualtrack[this.dialogData.ReversePointer].Int64 = ID
        visualtrack[this.dialogData.ReversePointer].Valid = true
        toUpdate.add(visualtrack)
      }
    )

    // update all visualtrack (only update selection & initial selection)
    toUpdate.forEach(
      visualtrack => {
        this.visualtrackService.updateVisualTrack(visualtrack)
          .subscribe(visualtrack => {
            this.visualtrackService.VisualTrackServiceChanged.next("update")
            console.log("visualtrack saved")
          });
      }
    )
    this.dialogRef.close('Pizza!');
  }
}
