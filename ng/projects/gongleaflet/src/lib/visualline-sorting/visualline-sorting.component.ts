// generated by gong
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { DialogData } from '../front-repo.service'
import { SelectionModel } from '@angular/cdk/collections';

import { Router, RouterState } from '@angular/router';
import { VisualLineDB } from '../visualline-db'
import { VisualLineService } from '../visualline.service'

import { FrontRepoService, FrontRepo, NullInt64 } from '../front-repo.service'
@Component({
  selector: 'lib-visualline-sorting',
  templateUrl: './visualline-sorting.component.html',
  styleUrls: ['./visualline-sorting.component.css']
})
export class VisualLineSortingComponent implements OnInit {

  frontRepo: FrontRepo

  // array of VisualLine instances that are in the association
  associatedVisualLines = new Array<VisualLineDB>();

  constructor(
    private visuallineService: VisualLineService,
    private frontRepoService: FrontRepoService,

    // not null if the component is called as a selection component of visualline instances
    public dialogRef: MatDialogRef<VisualLineSortingComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,

    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.getVisualLines()
  }

  getVisualLines(): void {
    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        let index = 0
        for (let visualline of this.frontRepo.VisualLines_array) {
          let ID = this.dialogData.ID
          let revPointerID = visualline[this.dialogData.ReversePointer]
          let revPointerID_Index = visualline[this.dialogData.ReversePointer+"_Index"]
          if (revPointerID.Int64 == ID) {
            if (revPointerID_Index == undefined) {
              revPointerID_Index = new NullInt64
              revPointerID_Index.Valid = true
              revPointerID_Index.Int64 = index++
            }
            this.associatedVisualLines.push(visualline)
          }
        }

        // sort associated visualline according to order
        this.associatedVisualLines.sort((t1, t2) => {
          let t1_revPointerID_Index = t1[this.dialogData.ReversePointer+"_Index"]
          let t2_revPointerID_Index = t2[this.dialogData.ReversePointer+"_Index"]
          if (t1_revPointerID_Index && t2_revPointerID_Index) {
            if (t1_revPointerID_Index.Int64 > t2_revPointerID_Index.Int64) {
              return 1;
            }
            if (t1_revPointerID_Index.Int64 < t2_revPointerID_Index.Int64) {
              return -1;
            }  
          }
          return 0;
        });

        console.log("front repo pull returned")
      }
    )
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.associatedVisualLines, event.previousIndex, event.currentIndex);

    // set the order of VisualLine instances
    let index = 0
    
    for (let visualline of this.associatedVisualLines) {
      let revPointerID_Index = visualline[this.dialogData.ReversePointer+"_Index"]
      revPointerID_Index.Valid = true
      revPointerID_Index.Int64 = index++
    }
    console.log("after drop")
  }

  save() {

    this.associatedVisualLines.forEach(
      visualline => {
        this.visuallineService.updateVisualLine(visualline)
          .subscribe(visualline => {
            this.visuallineService.VisualLineServiceChanged.next("update")
            console.log("visualline saved")
          });
      }
    )

    this.dialogRef.close('Sorting of '+ this.dialogData.ReversePointer+' done');
  }
}