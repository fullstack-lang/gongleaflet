// generated by gong
import { Component, OnInit, AfterViewInit, ViewChild, Inject, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatButton } from '@angular/material/button'

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { DialogData, FrontRepoService, FrontRepo, SelectionMode } from '../front-repo.service'
import { NullInt64 } from '../null-int64'
import { SelectionModel } from '@angular/cdk/collections';

const allowMultiSelect = true;

import { Router, RouterState } from '@angular/router';
import { MarkerDB } from '../marker-db'
import { MarkerService } from '../marker.service'

// insertion point for additional imports

// TableComponent is initilizaed from different routes
// TableComponentMode detail different cases 
enum TableComponentMode {
  DISPLAY_MODE,
  ONE_MANY_ASSOCIATION_MODE,
  MANY_MANY_ASSOCIATION_MODE,
}

// generated table component
@Component({
  selector: 'app-markerstable',
  templateUrl: './markers-table.component.html',
  styleUrls: ['./markers-table.component.css'],
})
export class MarkersTableComponent implements OnInit {

  // mode at invocation
  mode: TableComponentMode = TableComponentMode.DISPLAY_MODE

  // used if the component is called as a selection component of Marker instances
  selection: SelectionModel<MarkerDB> = new (SelectionModel)
  initialSelection = new Array<MarkerDB>()

  // the data source for the table
  markers: MarkerDB[] = []
  matTableDataSource: MatTableDataSource<MarkerDB> = new (MatTableDataSource)

  // front repo, that will be referenced by this.markers
  frontRepo: FrontRepo = new (FrontRepo)

  // displayedColumns is referenced by the MatTable component for specify what columns
  // have to be displayed and in what order
  displayedColumns: string[];

  // for sorting & pagination
  @ViewChild(MatSort)
  sort: MatSort | undefined
  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;

  ngAfterViewInit() {

    // enable sorting on all fields (including pointers and reverse pointer)
    this.matTableDataSource.sortingDataAccessor = (markerDB: MarkerDB, property: string) => {
      switch (property) {
        case 'ID':
          return markerDB.ID

        // insertion point for specific sorting accessor
        case 'Lat':
          return markerDB.Lat;

        case 'Lng':
          return markerDB.Lng;

        case 'Name':
          return markerDB.Name;

        case 'ColorEnum':
          return markerDB.ColorEnum;

        case 'LayerGroup':
          return (markerDB.LayerGroup ? markerDB.LayerGroup.Name : '');

        case 'DivIcon':
          return (markerDB.DivIcon ? markerDB.DivIcon.Name : '');

        default:
          console.assert(false, "Unknown field")
          return "";
      }
    };

    // enable filtering on all fields (including pointers and reverse pointer, which is not done by default)
    this.matTableDataSource.filterPredicate = (markerDB: MarkerDB, filter: string) => {

      // filtering is based on finding a lower case filter into a concatenated string
      // the markerDB properties
      let mergedContent = ""

      // insertion point for merging of fields
      mergedContent += markerDB.Lat.toString()
      mergedContent += markerDB.Lng.toString()
      mergedContent += markerDB.Name.toLowerCase()
      mergedContent += markerDB.ColorEnum.toLowerCase()
      if (markerDB.LayerGroup) {
        mergedContent += markerDB.LayerGroup.Name.toLowerCase()
      }
      if (markerDB.DivIcon) {
        mergedContent += markerDB.DivIcon.Name.toLowerCase()
      }

      let isSelected = mergedContent.includes(filter.toLowerCase())
      return isSelected
    };

    this.matTableDataSource.sort = this.sort!
    this.matTableDataSource.paginator = this.paginator!
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private markerService: MarkerService,
    private frontRepoService: FrontRepoService,

    // not null if the component is called as a selection component of marker instances
    public dialogRef: MatDialogRef<MarkersTableComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,

    private router: Router,
  ) {

    // compute mode
    if (dialogData == undefined) {
      this.mode = TableComponentMode.DISPLAY_MODE
    } else {
      switch (dialogData.SelectionMode) {
        case SelectionMode.ONE_MANY_ASSOCIATION_MODE:
          this.mode = TableComponentMode.ONE_MANY_ASSOCIATION_MODE
          break
        case SelectionMode.MANY_MANY_ASSOCIATION_MODE:
          this.mode = TableComponentMode.MANY_MANY_ASSOCIATION_MODE
          break
        default:
      }
    }

    // observable for changes in structs
    this.markerService.MarkerServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.getMarkers()
        }
      }
    )
    if (this.mode == TableComponentMode.DISPLAY_MODE) {
      this.displayedColumns = ['ID', 'Edit', 'Delete', // insertion point for columns to display
        "Lat",
        "Lng",
        "Name",
        "ColorEnum",
        "LayerGroup",
        "DivIcon",
      ]
    } else {
      this.displayedColumns = ['select', 'ID', // insertion point for columns to display
        "Lat",
        "Lng",
        "Name",
        "ColorEnum",
        "LayerGroup",
        "DivIcon",
      ]
      this.selection = new SelectionModel<MarkerDB>(allowMultiSelect, this.initialSelection);
    }

  }

  ngOnInit(): void {
    this.getMarkers()
    this.matTableDataSource = new MatTableDataSource(this.markers)
  }

  getMarkers(): void {
    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        this.markers = this.frontRepo.Markers_array;

        // insertion point for time duration Recoveries
        // insertion point for enum int Recoveries
        
        // in case the component is called as a selection component
        if (this.mode == TableComponentMode.ONE_MANY_ASSOCIATION_MODE) {
          for (let marker of this.markers) {
            let ID = this.dialogData.ID
            let revPointer = marker[this.dialogData.ReversePointer as keyof MarkerDB] as unknown as NullInt64
            if (revPointer.Int64 == ID) {
              this.initialSelection.push(marker)
            }
            this.selection = new SelectionModel<MarkerDB>(allowMultiSelect, this.initialSelection);
          }
        }

        if (this.mode == TableComponentMode.MANY_MANY_ASSOCIATION_MODE) {

          let mapOfSourceInstances = this.frontRepo[this.dialogData.SourceStruct + "s" as keyof FrontRepo] as Map<number, MarkerDB>
          let sourceInstance = mapOfSourceInstances.get(this.dialogData.ID)!

          let sourceField = sourceInstance[this.dialogData.SourceField as keyof typeof sourceInstance]! as unknown as MarkerDB[]
          for (let associationInstance of sourceField) {
            let marker = associationInstance[this.dialogData.IntermediateStructField as keyof typeof associationInstance] as unknown as MarkerDB
            this.initialSelection.push(marker)
          }

          this.selection = new SelectionModel<MarkerDB>(allowMultiSelect, this.initialSelection);
        }

        // update the mat table data source
        this.matTableDataSource.data = this.markers
      }
    )
  }

  // newMarker initiate a new marker
  // create a new Marker objet
  newMarker() {
  }

  deleteMarker(markerID: number, marker: MarkerDB) {
    // list of markers is truncated of marker before the delete
    this.markers = this.markers.filter(h => h !== marker);

    this.markerService.deleteMarker(markerID).subscribe(
      marker => {
        this.markerService.MarkerServiceChanged.next("delete")
      }
    );
  }

  editMarker(markerID: number, marker: MarkerDB) {

  }

  // display marker in router
  displayMarkerInRouter(markerID: number) {
    this.router.navigate(["github_com_fullstack_lang_gongleaflet_go-" + "marker-display", markerID])
  }

  // set editor outlet
  setEditorRouterOutlet(markerID: number) {
    this.router.navigate([{
      outlets: {
        github_com_fullstack_lang_gongleaflet_go_editor: ["github_com_fullstack_lang_gongleaflet_go-" + "marker-detail", markerID]
      }
    }]);
  }

  // set presentation outlet
  setPresentationRouterOutlet(markerID: number) {
    this.router.navigate([{
      outlets: {
        github_com_fullstack_lang_gongleaflet_go_presentation: ["github_com_fullstack_lang_gongleaflet_go-" + "marker-presentation", markerID]
      }
    }]);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.markers.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.markers.forEach(row => this.selection.select(row));
  }

  save() {

    if (this.mode == TableComponentMode.ONE_MANY_ASSOCIATION_MODE) {

      let toUpdate = new Set<MarkerDB>()

      // reset all initial selection of marker that belong to marker
      for (let marker of this.initialSelection) {
        let index = marker[this.dialogData.ReversePointer as keyof MarkerDB] as unknown as NullInt64
        index.Int64 = 0
        index.Valid = true
        toUpdate.add(marker)

      }

      // from selection, set marker that belong to marker
      for (let marker of this.selection.selected) {
        let ID = this.dialogData.ID as number
        let reversePointer = marker[this.dialogData.ReversePointer as keyof MarkerDB] as unknown as NullInt64
        reversePointer.Int64 = ID
        reversePointer.Valid = true
        toUpdate.add(marker)
      }


      // update all marker (only update selection & initial selection)
      for (let marker of toUpdate) {
        this.markerService.updateMarker(marker)
          .subscribe(marker => {
            this.markerService.MarkerServiceChanged.next("update")
          });
      }
    }

    if (this.mode == TableComponentMode.MANY_MANY_ASSOCIATION_MODE) {

      // get the source instance via the map of instances in the front repo
      let mapOfSourceInstances = this.frontRepo[this.dialogData.SourceStruct + "s" as keyof FrontRepo] as Map<number, MarkerDB>
      let sourceInstance = mapOfSourceInstances.get(this.dialogData.ID)!

      // First, parse all instance of the association struct and remove the instance
      // that have unselect
      let unselectedMarker = new Set<number>()
      for (let marker of this.initialSelection) {
        if (this.selection.selected.includes(marker)) {
          // console.log("marker " + marker.Name + " is still selected")
        } else {
          console.log("marker " + marker.Name + " has been unselected")
          unselectedMarker.add(marker.ID)
          console.log("is unselected " + unselectedMarker.has(marker.ID))
        }
      }

      // delete the association instance
      let associationInstance = sourceInstance[this.dialogData.SourceField as keyof typeof sourceInstance]
      let marker = associationInstance![this.dialogData.IntermediateStructField as keyof typeof associationInstance] as unknown as MarkerDB
      if (unselectedMarker.has(marker.ID)) {
        this.frontRepoService.deleteService(this.dialogData.IntermediateStruct, associationInstance)


      }

      // is the source array is empty create it
      if (sourceInstance[this.dialogData.SourceField as keyof typeof sourceInstance] == undefined) {
        (sourceInstance[this.dialogData.SourceField as keyof typeof sourceInstance] as unknown as Array<MarkerDB>) = new Array<MarkerDB>()
      }

      // second, parse all instance of the selected
      if (sourceInstance[this.dialogData.SourceField as keyof typeof sourceInstance]) {
        this.selection.selected.forEach(
          marker => {
            if (!this.initialSelection.includes(marker)) {
              // console.log("marker " + marker.Name + " has been added to the selection")

              let associationInstance = {
                Name: sourceInstance["Name"] + "-" + marker.Name,
              }

              let index = associationInstance[this.dialogData.IntermediateStructField + "ID" as keyof typeof associationInstance] as unknown as NullInt64
              index.Int64 = marker.ID
              index.Valid = true

              let indexDB = associationInstance[this.dialogData.IntermediateStructField + "DBID" as keyof typeof associationInstance] as unknown as NullInt64
              indexDB.Int64 = marker.ID
              index.Valid = true

              this.frontRepoService.postService(this.dialogData.IntermediateStruct, associationInstance)

            } else {
              // console.log("marker " + marker.Name + " is still selected")
            }
          }
        )
      }

      // this.selection = new SelectionModel<MarkerDB>(allowMultiSelect, this.initialSelection);
    }

    // why pizza ?
    this.dialogRef.close('Pizza!');
  }
}
