// generated from NgDetailTemplateTS
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VisualCenterDB } from '../visualcenter-db'
import { VisualCenterService } from '../visualcenter.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'
import { MapOfComponents } from '../map-components'

// insertion point for imports
import { VisualColorEnumSelect, VisualColorEnumList } from '../VisualColorEnum'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { NullInt64 } from '../front-repo.service'

@Component({
	selector: 'app-visualcenter-detail',
	templateUrl: './visualcenter-detail.component.html',
	styleUrls: ['./visualcenter-detail.component.css'],
})
export class VisualCenterDetailComponent implements OnInit {

	// insertion point for declarations
	VisualColorEnumList: VisualColorEnumSelect[]

	// the VisualCenterDB of interest
	visualcenter: VisualCenterDB;

	// front repo
	frontRepo: FrontRepo

	constructor(
		private visualcenterService: VisualCenterService,
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
		this.getVisualCenter()

		// observable for changes in structs
		this.visualcenterService.VisualCenterServiceChanged.subscribe(
			message => {
				if (message == "post" || message == "update" || message == "delete") {
					this.getVisualCenter()
				}
			}
		)

		// insertion point for initialisation of enums list
		this.VisualColorEnumList = VisualColorEnumList
	}

	getVisualCenter(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		this.frontRepoService.pull().subscribe(
			frontRepo => {
				this.frontRepo = frontRepo
				console.log("front repo VisualCenterPull returned")

				if (id != 0 && association == undefined) {
					this.visualcenter = frontRepo.VisualCenters.get(id)
				} else {
					this.visualcenter = new (VisualCenterDB)
				}

				// insertion point for recovery of form controls value for bool fields
			}
		)


	}

	save(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		// insertion point for saving value of form controls of boolean fields
		if (this.visualcenter.VisualLayerID == undefined) {
			this.visualcenter.VisualLayerID = new NullInt64
		}
		if (this.visualcenter.VisualLayer != undefined) {
			this.visualcenter.VisualLayerID.Int64 = this.visualcenter.VisualLayer.ID
			this.visualcenter.VisualLayerID.Valid = true
			this.visualcenter.VisualLayerName = this.visualcenter.VisualLayer.Name
		} else {
			this.visualcenter.VisualLayerID.Int64 = 0
			this.visualcenter.VisualLayerID.Valid = true
			this.visualcenter.VisualLayerName = ""
		}
		if (this.visualcenter.VisualIconID == undefined) {
			this.visualcenter.VisualIconID = new NullInt64
		}
		if (this.visualcenter.VisualIcon != undefined) {
			this.visualcenter.VisualIconID.Int64 = this.visualcenter.VisualIcon.ID
			this.visualcenter.VisualIconID.Valid = true
			this.visualcenter.VisualIconName = this.visualcenter.VisualIcon.Name
		} else {
			this.visualcenter.VisualIconID.Int64 = 0
			this.visualcenter.VisualIconID.Valid = true
			this.visualcenter.VisualIconName = ""
		}

		if (id != 0 && association == undefined) {
			// insertion point for saving value of reverse pointers

			this.visualcenterService.updateVisualCenter(this.visualcenter)
				.subscribe(visualcenter => {
					this.visualcenterService.VisualCenterServiceChanged.next("update")

					console.log("visualcenter saved")
				});
		} else {
			switch (association) {
				// insertion point for saving value of ONE_MANY association reverse pointer
			}
			this.visualcenterService.postVisualCenter(this.visualcenter).subscribe(visualcenter => {

				this.visualcenterService.VisualCenterServiceChanged.next("post")

				this.visualcenter = {} // reset fields
				console.log("visualcenter added")
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
			ID: this.visualcenter.ID,
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
