// generated by gong
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { DialogData } from '../front-repo.service'
import { SelectionModel } from '@angular/cdk/collections';

import { Router, RouterState } from '@angular/router';
import { VisualLayerDB } from '../visuallayer-db'
import { VisualLayerService } from '../visuallayer.service'

import { FrontRepoService, FrontRepo, NullInt64 } from '../front-repo.service'
@Component({
  selector: 'lib-visuallayer-sorting',
  templateUrl: './visuallayer-sorting.component.html',
  styleUrls: ['./visuallayer-sorting.component.css']
})
export class VisualLayerSortingComponent implements OnInit {

  frontRepo: FrontRepo

  // array of VisualLayer instances that are in the association
  associatedVisualLayers = new Array<VisualLayerDB>();

  constructor(
    private visuallayerService: VisualLayerService,
    private frontRepoService: FrontRepoService,

    // not null if the component is called as a selection component of visuallayer instances
    public dialogRef: MatDialogRef<VisualLayerSortingComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,

    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.getVisualLayers()
  }

  getVisualLayers(): void {
    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        let index = 0
        for (let visuallayer of this.frontRepo.VisualLayers_array) {
          let ID = this.dialogData.ID
          let revPointerID = visuallayer[this.dialogData.ReversePointer]
          let revPointerID_Index = visuallayer[this.dialogData.ReversePointer+"_Index"]
          if (revPointerID.Int64 == ID) {
            if (revPointerID_Index == undefined) {
              revPointerID_Index = new NullInt64
              revPointerID_Index.Valid = true
              revPointerID_Index.Int64 = index++
            }
            this.associatedVisualLayers.push(visuallayer)
          }
        }

        // sort associated visuallayer according to order
        this.associatedVisualLayers.sort((t1, t2) => {
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
    moveItemInArray(this.associatedVisualLayers, event.previousIndex, event.currentIndex);

    // set the order of VisualLayer instances
    let index = 0
    
    for (let visuallayer of this.associatedVisualLayers) {
      let revPointerID_Index = visuallayer[this.dialogData.ReversePointer+"_Index"]
      revPointerID_Index.Valid = true
      revPointerID_Index.Int64 = index++
    }
    console.log("after drop")
  }

  save() {

    this.associatedVisualLayers.forEach(
      visuallayer => {
        this.visuallayerService.updateVisualLayer(visuallayer)
          .subscribe(visuallayer => {
            this.visuallayerService.VisualLayerServiceChanged.next("update")
            console.log("visuallayer saved")
          });
      }
    )

    this.dialogRef.close('Sorting of '+ this.dialogData.ReversePointer+' done');
  }
}