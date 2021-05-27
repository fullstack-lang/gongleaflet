// generated from NgDetailTemplateTS
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VisualMapDB } from '../visualmap-db'
import { VisualMapService } from '../visualmap.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'
import { MapOfComponents } from '../map-components'
import { MapOfSortingComponents } from '../map-components'

// insertion point for imports

import { Router, RouterState, ActivatedRoute } from '@angular/router';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { NullInt64 } from '../front-repo.service'

@Component({
	selector: 'app-visualmap-detail',
	templateUrl: './visualmap-detail.component.html',
	styleUrls: ['./visualmap-detail.component.css'],
})
export class VisualMapDetailComponent implements OnInit {

	// insertion point for declarations
	ZoomControlFormControl = new FormControl(false);
	AttributionControlFormControl = new FormControl(false);
	ZoomSnapFormControl = new FormControl(false);

	// the VisualMapDB of interest
	visualmap: VisualMapDB;

	// front repo
	frontRepo: FrontRepo

	constructor(
		private visualmapService: VisualMapService,
		private frontRepoService: FrontRepoService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.getVisualMap()

		// observable for changes in structs
		this.visualmapService.VisualMapServiceChanged.subscribe(
			message => {
				if (message == "post" || message == "update" || message == "delete") {
					this.getVisualMap()
				}
			}
		)

		// insertion point for initialisation of enums list
	}

	getVisualMap(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		this.frontRepoService.pull().subscribe(
			frontRepo => {
				this.frontRepo = frontRepo
				console.log("front repo VisualMapPull returned")

				if (id != 0 && association == undefined) {
					this.visualmap = frontRepo.VisualMaps.get(id)
				} else {
					this.visualmap = new (VisualMapDB)
				}

				// insertion point for recovery of form controls value for bool fields
				this.ZoomControlFormControl.setValue(this.visualmap.ZoomControl)
				this.AttributionControlFormControl.setValue(this.visualmap.AttributionControl)
				this.ZoomSnapFormControl.setValue(this.visualmap.ZoomSnap)
			}
		)


	}

	save(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		// some fields needs to be translated into serializable forms
		// pointers fields, after the translation, are nulled in order to perform serialization
		
		// insertion point for translation/nullation of each field
		this.visualmap.ZoomControl = this.ZoomControlFormControl.value
		this.visualmap.AttributionControl = this.AttributionControlFormControl.value
		this.visualmap.ZoomSnap = this.ZoomSnapFormControl.value
		
		// save from the front pointer space to the non pointer space for serialization
		if (association == undefined) {
			// insertion point for translation/nullation of each pointers
		}

		if (id != 0 && association == undefined) {

			this.visualmapService.updateVisualMap(this.visualmap)
				.subscribe(visualmap => {
					this.visualmapService.VisualMapServiceChanged.next("update")

					console.log("visualmap saved")
				});
		} else {
			switch (association) {
				// insertion point for saving value of ONE_MANY association reverse pointer
			}
			this.visualmapService.postVisualMap(this.visualmap).subscribe(visualmap => {

				this.visualmapService.VisualMapServiceChanged.next("post")

				this.visualmap = {} // reset fields
				console.log("visualmap added")
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
			ID: this.visualmap.ID,
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
			console.log('The dialog was closed');
		});
	}

	openDragAndDropOrdering(AssociatedStruct: string, reverseField: string) {

		const dialogConfig = new MatDialogConfig();

		// dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			ID: this.visualmap.ID,
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
			console.log('The dialog was closed');
		});
	}
}
