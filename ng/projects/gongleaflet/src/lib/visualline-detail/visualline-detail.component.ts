// generated from NgDetailTemplateTS
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VisualLineDB } from '../visualline-db'
import { VisualLineService } from '../visualline.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'
import { MapOfComponents } from '../map-components'
import { MapOfSortingComponents } from '../map-components'

// insertion point for imports
import { VisualColorEnumSelect, VisualColorEnumList } from '../VisualColorEnum'
import { DashStyleEnumSelect, DashStyleEnumList } from '../DashStyleEnum'
import { TransmittingEnumSelect, TransmittingEnumList } from '../TransmittingEnum'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { NullInt64 } from '../front-repo.service'

@Component({
	selector: 'app-visualline-detail',
	templateUrl: './visualline-detail.component.html',
	styleUrls: ['./visualline-detail.component.css'],
})
export class VisualLineDetailComponent implements OnInit {

	// insertion point for declarations
	VisualColorEnumList: VisualColorEnumSelect[]
	DashStyleEnumList: DashStyleEnumSelect[]
	TransmittingEnumList: TransmittingEnumSelect[]

	// the VisualLineDB of interest
	visualline: VisualLineDB;

	// front repo
	frontRepo: FrontRepo

	constructor(
		private visuallineService: VisualLineService,
		private frontRepoService: FrontRepoService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.getVisualLine()

		// observable for changes in structs
		this.visuallineService.VisualLineServiceChanged.subscribe(
			message => {
				if (message == "post" || message == "update" || message == "delete") {
					this.getVisualLine()
				}
			}
		)

		// insertion point for initialisation of enums list
		this.VisualColorEnumList = VisualColorEnumList
		this.DashStyleEnumList = DashStyleEnumList
		this.TransmittingEnumList = TransmittingEnumList
	}

	getVisualLine(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		this.frontRepoService.pull().subscribe(
			frontRepo => {
				this.frontRepo = frontRepo
				if (id != 0 && association == undefined) {
					this.visualline = frontRepo.VisualLines.get(id)
				} else {
					this.visualline = new (VisualLineDB)
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
		if (this.visualline.VisualLayerID == undefined) {
			this.visualline.VisualLayerID = new NullInt64
		}
		if (this.visualline.VisualLayer != undefined) {
			this.visualline.VisualLayerID.Int64 = this.visualline.VisualLayer.ID
			this.visualline.VisualLayerID.Valid = true
			this.visualline.VisualLayerName = this.visualline.VisualLayer.Name
		} else {
			this.visualline.VisualLayerID.Int64 = 0
			this.visualline.VisualLayerID.Valid = true
			this.visualline.VisualLayerName = ""
		}
		
		// save from the front pointer space to the non pointer space for serialization
		if (association == undefined) {
			// insertion point for translation/nullation of each pointers
		}

		if (id != 0 && association == undefined) {

			this.visuallineService.updateVisualLine(this.visualline)
				.subscribe(visualline => {
					this.visuallineService.VisualLineServiceChanged.next("update")
				});
		} else {
			switch (association) {
				// insertion point for saving value of ONE_MANY association reverse pointer
			}
			this.visuallineService.postVisualLine(this.visualline).subscribe(visualline => {

				this.visuallineService.VisualLineServiceChanged.next("post")

				this.visualline = {} // reset fields
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
			ID: this.visualline.ID,
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
			ID: this.visualline.ID,
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
}
