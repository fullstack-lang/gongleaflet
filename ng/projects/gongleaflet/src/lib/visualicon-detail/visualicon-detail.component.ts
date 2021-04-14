// generated from NgDetailTemplateTS
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VisualIconDB } from '../visualicon-db'
import { VisualIconService } from '../visualicon.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'
import { MapOfComponents } from '../map-components'

// insertion point for imports

import { Router, RouterState, ActivatedRoute } from '@angular/router';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { NullInt64 } from '../front-repo.service'

@Component({
	selector: 'app-visualicon-detail',
	templateUrl: './visualicon-detail.component.html',
	styleUrls: ['./visualicon-detail.component.css'],
})
export class VisualIconDetailComponent implements OnInit {

	// insertion point for declarations

	// the VisualIconDB of interest
	visualicon: VisualIconDB;

	// front repo
	frontRepo: FrontRepo

	constructor(
		private visualiconService: VisualIconService,
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
		this.getVisualIcon()

		// observable for changes in structs
		this.visualiconService.VisualIconServiceChanged.subscribe(
			message => {
				if (message == "post" || message == "update" || message == "delete") {
					this.getVisualIcon()
				}
			}
		)

		// insertion point for initialisation of enums list
	}

	getVisualIcon(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		this.frontRepoService.pull().subscribe(
			frontRepo => {
				this.frontRepo = frontRepo
				console.log("front repo VisualIconPull returned")

				if (id != 0 && association == undefined) {
					this.visualicon = frontRepo.VisualIcons.get(id)
				} else {
					this.visualicon = new (VisualIconDB)
				}

				// insertion point for recovery of form controls value for bool fields
			}
		)


	}

	save(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		// insertion point for saving value of form controls of boolean fields

		if (id != 0 && association == undefined) {
			// insertion point for saving value of reverse pointers

			this.visualiconService.updateVisualIcon(this.visualicon)
				.subscribe(visualicon => {
					this.visualiconService.VisualIconServiceChanged.next("update")

					console.log("visualicon saved")
				});
		} else {
			switch (association) {
				// insertion point for saving value of ONE_MANY association reverse pointer
			}
			this.visualiconService.postVisualIcon(this.visualicon).subscribe(visualicon => {

				this.visualiconService.VisualIconServiceChanged.next("post")

				this.visualicon = {} // reset fields
				console.log("visualicon added")
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
			ID: this.visualicon.ID,
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
