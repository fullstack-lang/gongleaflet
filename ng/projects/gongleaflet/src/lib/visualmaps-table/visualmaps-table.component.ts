// generated from NgTableTemplateTS
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, Inject, Optional } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatButton } from '@angular/material/button'

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { DialogData } from '../front-repo.service'
import { SelectionModel } from '@angular/cdk/collections';

const allowMultiSelect = true;

import { Router, RouterState } from '@angular/router';
import { VisualMapDB } from '../visualmap-db'
import { VisualMapService } from '../visualmap.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'

// generated table component
@Component({
  selector: 'app-visualmaps-table',
  templateUrl: './visualmaps-table.component.html',
  styleUrls: ['./visualmaps-table.component.css'],
})
export class VisualMapsTableComponent implements OnInit {

  // used if the component is called as a selection component of VisualMap instances
  selection: SelectionModel<VisualMapDB>;
  initialSelection = new Array<VisualMapDB>();

  // the data source for the table
  visualmaps: VisualMapDB[];

  // front repo, that will be referenced by this.visualmaps
  frontRepo: FrontRepo

  // displayedColumns is referenced by the MatTable component for specify what columns
  // have to be displayed and in what order
  displayedColumns: string[];

  constructor(
    private visualmapService: VisualMapService,
    private frontRepoService: FrontRepoService,

    // not null if the component is called as a selection component of visualmap instances
    public dialogRef: MatDialogRef<VisualMapsTableComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,

    private router: Router,
  ) {
    // https://stackoverflow.com/questions/54627478/angular-7-routing-to-same-component-but-different-param-not-working
    // this is for routerLink on same component when only queryParameter changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // observable for changes in structs
    this.visualmapService.VisualMapServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.getVisualMaps()
        }
      }
    )
    if (dialogData == undefined) {
      this.displayedColumns = ['ID', 'Edit', 'Delete', // insertion point for columns to display
        "Lat",
        "Lng",
        "Name",
        "ZoomLevel",
        "UrlTemplate",
        "Attribution",
        "MaxZoom",
        "ZoomControl",
        "AttributionControl",
        "ZoomSnap",
      ]
    } else {
      this.displayedColumns = ['select', 'ID', // insertion point for columns to display
        "Lat",
        "Lng",
        "Name",
        "ZoomLevel",
        "UrlTemplate",
        "Attribution",
        "MaxZoom",
        "ZoomControl",
        "AttributionControl",
        "ZoomSnap",
      ]
      this.selection = new SelectionModel<VisualMapDB>(allowMultiSelect, this.initialSelection);
    }

  }

  ngOnInit(): void {
    this.getVisualMaps()
  }

  getVisualMaps(): void {
    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo
        console.log("front repo pull returned")

        this.visualmaps = this.frontRepo.VisualMaps_array;

        // insertion point for variables Recoveries

        // in case the component is called as a selection component
        if (this.dialogData != undefined) {
          this.visualmaps.forEach(
            visualmap => {
              let ID = this.dialogData.ID
              let revPointer = visualmap[this.dialogData.ReversePointer]
              if (revPointer.Int64 == ID) {
                this.initialSelection.push(visualmap)
              }
            }
          )
          this.selection = new SelectionModel<VisualMapDB>(allowMultiSelect, this.initialSelection);
        }
      }
    )
  }

  // newVisualMap initiate a new visualmap
  // create a new VisualMap objet
  newVisualMap() {
  }

  deleteVisualMap(visualmapID: number, visualmap: VisualMapDB) {
    // list of visualmaps is truncated of visualmap before the delete
    this.visualmaps = this.visualmaps.filter(h => h !== visualmap);

    this.visualmapService.deleteVisualMap(visualmapID).subscribe(
      visualmap => {
        this.visualmapService.VisualMapServiceChanged.next("delete")

        console.log("visualmap deleted")
      }
    );
  }

  editVisualMap(visualmapID: number, visualmap: VisualMapDB) {

  }

  // display visualmap in router
  displayVisualMapInRouter(visualmapID: number) {
    this.router.navigate( ["visualmap-display", visualmapID])
  }

  // set editor outlet
  setEditorRouterOutlet(visualmapID: number) {
    this.router.navigate([{
      outlets: {
        editor: ["visualmap-detail", visualmapID]
      }
    }]);
  }

  // set presentation outlet
  setPresentationRouterOutlet(visualmapID: number) {
    this.router.navigate([{
      outlets: {
        presentation: ["visualmap-presentation", visualmapID]
      }
    }]);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.visualmaps.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.visualmaps.forEach(row => this.selection.select(row));
  }

  save() {

    let toUpdate = new Set<VisualMapDB>()

    // reset all initial selection of visualmap that belong to visualmap through Anarrayofb
    this.initialSelection.forEach(
      visualmap => {
        visualmap[this.dialogData.ReversePointer].Int64 = 0
        visualmap[this.dialogData.ReversePointer].Valid = true
        toUpdate.add(visualmap)
      }
    )

    // from selection, set visualmap that belong to visualmap through Anarrayofb
    this.selection.selected.forEach(
      visualmap => {
        console.log("selection ID " + visualmap.ID)
        let ID = +this.dialogData.ID
        visualmap[this.dialogData.ReversePointer].Int64 = ID
        visualmap[this.dialogData.ReversePointer].Valid = true
        toUpdate.add(visualmap)
      }
    )

    // update all visualmap (only update selection & initial selection)
    toUpdate.forEach(
      visualmap => {
        this.visualmapService.updateVisualMap(visualmap)
          .subscribe(visualmap => {
            this.visualmapService.VisualMapServiceChanged.next("update")
            console.log("visualmap saved")
          });
      }
    )
    this.dialogRef.close('Pizza!');
  }
}
