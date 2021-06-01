// generated from NgDetailTemplateTS
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VisualCircleDB } from '../visualcircle-db'
import { VisualCircleService } from '../visualcircle.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'
import { MapOfComponents } from '../map-components'
import { MapOfSortingComponents } from '../map-components'

// insertion point for imports
import { VisualColorEnumSelect, VisualColorEnumList } from '../VisualColorEnum'
import { DashStyleEnumSelect, DashStyleEnumList } from '../DashStyleEnum'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { NullInt64 } from '../front-repo.service'

@Component({
	selector: 'app-visualcircle-detail',
	templateUrl: './visualcircle-detail.component.html',
	styleUrls: ['./visualcircle-detail.component.css'],
})
export class VisualCircleDetailComponent implements OnInit {

	// insertion point for declarations
	VisualColorEnumList: VisualColorEnumSelect[]
	DashStyleEnumList: DashStyleEnumSelect[]

	// the VisualCircleDB of interest
	visualcircle: VisualCircleDB;

	// front repo
	frontRepo: FrontRepo

	constructor(
		private visualcircleService: VisualCircleService,
		private frontRepoService: FrontRepoService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.getVisualCircle()

		// observable for changes in structs
		this.visualcircleService.VisualCircleServiceChanged.subscribe(
			message => {
				if (message == "post" || message == "update" || message == "delete") {
					this.getVisualCircle()
				}
			}
		)

		// insertion point for initialisation of enums list
		this.VisualColorEnumList = VisualColorEnumList
		this.DashStyleEnumList = DashStyleEnumList
	}

	getVisualCircle(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		this.frontRepoService.pull().subscribe(
			frontRepo => {
				this.frontRepo = frontRepo
				if (id != 0 && association == undefined) {
					this.visualcircle = frontRepo.VisualCircles.get(id)
				} else {
					this.visualcircle = new (VisualCircleDB)
				}

				// insertion point for recovery of form controls value for bool fields
			}
		)


	}

	save(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		// some fields needs to be translated into serializable forms
		// pointers fields, after the translation, are nulled in order to perform serialization
		
		// insertion point for translation/nullation of each field
		if (this.visualcircle.VisualLayerID == undefined) {
			this.visualcircle.VisualLayerID = new NullInt64
		}
		if (this.visualcircle.VisualLayer != undefined) {
			this.visualcircle.VisualLayerID.Int64 = this.visualcircle.VisualLayer.ID
			this.visualcircle.VisualLayerID.Valid = true
			this.visualcircle.VisualLayerName = this.visualcircle.VisualLayer.Name
		} else {
			this.visualcircle.VisualLayerID.Int64 = 0
			this.visualcircle.VisualLayerID.Valid = true
			this.visualcircle.VisualLayerName = ""
		}
		
		// save from the front pointer space to the non pointer space for serialization
		if (association == undefined) {
			// insertion point for translation/nullation of each pointers
		}

		if (id != 0 && association == undefined) {

			this.visualcircleService.updateVisualCircle(this.visualcircle)
				.subscribe(visualcircle => {
					this.visualcircleService.VisualCircleServiceChanged.next("update")
				});
		} else {
			switch (association) {
				// insertion point for saving value of ONE_MANY association reverse pointer
			}
			this.visualcircleService.postVisualCircle(this.visualcircle).subscribe(visualcircle => {

				this.visualcircleService.VisualCircleServiceChanged.next("post")

				this.visualcircle = {} // reset fields
			});
		}
	}

	// openReverseSelection is a generic function that calls dialog for the edition of 
	// ONE-MANY association
	// It uses the MapOfComponent provided by the front repo
	openReverseSelection(AssociatedStruct: string, reverseField: string) {

		const dialogConfig = new MatDialogConfig();

		// dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = "50%"
		dialogConfig.height = "50%"
		dialogConfig.data = {
			ID: this.visualcircle.ID,
			ReversePointer: reverseField,
			OrderingMode: false,
		};
		const dialogRef: MatDialogRef<string, any> = this.dialog.open(
			MapOfComponents.get(AssociatedStruct).get(
				AssociatedStruct + 'sTableComponent'
			),
			dialogConfig
		);

		dialogRef.afterClosed().subscribe(result => {
		});
	}

	openDragAndDropOrdering(AssociatedStruct: string, reverseField: string) {

		const dialogConfig = new MatDialogConfig();

		// dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			ID: this.visualcircle.ID,
			ReversePointer: reverseField,
			OrderingMode: true,
		};
		const dialogRef: MatDialogRef<string, any> = this.dialog.open(
			MapOfSortingComponents.get(AssociatedStruct).get(
				AssociatedStruct + 'SortingComponent'
			),
			dialogConfig
		);

		dialogRef.afterClosed().subscribe(result => {
		});
	}

	fillUpNameIfEmpty(event) {
		if (this.visualcircle.Name == undefined) {
			this.visualcircle.Name = event.value.Name		
		}
	}
}
