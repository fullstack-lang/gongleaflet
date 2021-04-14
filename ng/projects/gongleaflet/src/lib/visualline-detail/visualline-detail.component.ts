// generated from NgDetailTemplateTS
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VisualLineDB } from '../visualline-db'
import { VisualLineService } from '../visualline.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'
import { MapOfComponents } from '../map-components'

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
		// https://stackoverflow.com/questions/54627478/angular-7-routing-to-same-component-but-different-param-not-working
		// this is for routerLink on same component when only queryParameter changes
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
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
				console.log("front repo VisualLinePull returned")

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

		// insertion point for saving value of form controls of boolean fields
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

		if (id != 0 && association == undefined) {
			// insertion point for saving value of reverse pointers

			this.visuallineService.updateVisualLine(this.visualline)
				.subscribe(visualline => {
					this.visuallineService.VisualLineServiceChanged.next("update")

					console.log("visualline saved")
				});
		} else {
			switch (association) {
				// insertion point for saving value of ONE_MANY association reverse pointer
			}
			this.visuallineService.postVisualLine(this.visualline).subscribe(visualline => {

				this.visuallineService.VisualLineServiceChanged.next("post")

				this.visualline = {} // reset fields
				console.log("visualline added")
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
		dialogConfig.data = {
			ID: this.visualline.ID,
			ReversePointer: reverseField,
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
}
