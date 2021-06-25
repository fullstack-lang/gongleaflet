// generated from NgDetailTemplateTS
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { VisualTrackDB } from '../visualtrack-db'
import { VisualTrackService } from '../visualtrack.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'
import { MapOfComponents } from '../map-components'
import { MapOfSortingComponents } from '../map-components'

// insertion point for imports
import { VisualColorEnumSelect, VisualColorEnumList } from '../VisualColorEnum'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { NullInt64 } from '../front-repo.service'

@Component({
	selector: 'app-visualtrack-detail',
	templateUrl: './visualtrack-detail.component.html',
	styleUrls: ['./visualtrack-detail.component.css'],
})
export class VisualTrackDetailComponent implements OnInit {

	// insertion point for declarations
	VisualColorEnumList: VisualColorEnumSelect[]
	DisplayFormControl = new FormControl(false);
	DisplayTrackHistoryFormControl = new FormControl(false);
	DisplayLevelAndSpeedFormControl = new FormControl(false);

	// the VisualTrackDB of interest
	visualtrack: VisualTrackDB;

	// front repo
	frontRepo: FrontRepo

	// this stores the information related to string fields
	// if false, the field is inputed with an <input ...> form 
	// if true, it is inputed with a <textarea ...> </textarea>
	mapFields_displayAsTextArea = new Map<string, boolean>()

	constructor(
		private visualtrackService: VisualTrackService,
		private frontRepoService: FrontRepoService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.getVisualTrack()

		// observable for changes in structs
		this.visualtrackService.VisualTrackServiceChanged.subscribe(
			message => {
				if (message == "post" || message == "update" || message == "delete") {
					this.getVisualTrack()
				}
			}
		)

		// insertion point for initialisation of enums list
		this.VisualColorEnumList = VisualColorEnumList
	}

	getVisualTrack(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		this.frontRepoService.pull().subscribe(
			frontRepo => {
				this.frontRepo = frontRepo
				if (id != 0 && association == undefined) {
					this.visualtrack = frontRepo.VisualTracks.get(id)
				} else {
					this.visualtrack = new (VisualTrackDB)
				}

				// insertion point for recovery of form controls value for bool fields
				this.DisplayFormControl.setValue(this.visualtrack.Display)
				this.DisplayTrackHistoryFormControl.setValue(this.visualtrack.DisplayTrackHistory)
				this.DisplayLevelAndSpeedFormControl.setValue(this.visualtrack.DisplayLevelAndSpeed)
			}
		)


	}

	save(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		const association = this.route.snapshot.paramMap.get('association');

		// some fields needs to be translated into serializable forms
		// pointers fields, after the translation, are nulled in order to perform serialization

		// insertion point for translation/nullation of each field
		if (this.visualtrack.VisualLayerID == undefined) {
			this.visualtrack.VisualLayerID = new NullInt64
		}
		if (this.visualtrack.VisualLayer != undefined) {
			this.visualtrack.VisualLayerID.Int64 = this.visualtrack.VisualLayer.ID
			this.visualtrack.VisualLayerID.Valid = true
		} else {
			this.visualtrack.VisualLayerID.Int64 = 0
			this.visualtrack.VisualLayerID.Valid = true
		}
		if (this.visualtrack.VisualIconID == undefined) {
			this.visualtrack.VisualIconID = new NullInt64
		}
		if (this.visualtrack.VisualIcon != undefined) {
			this.visualtrack.VisualIconID.Int64 = this.visualtrack.VisualIcon.ID
			this.visualtrack.VisualIconID.Valid = true
		} else {
			this.visualtrack.VisualIconID.Int64 = 0
			this.visualtrack.VisualIconID.Valid = true
		}
		this.visualtrack.Display = this.DisplayFormControl.value
		this.visualtrack.DisplayTrackHistory = this.DisplayTrackHistoryFormControl.value
		this.visualtrack.DisplayLevelAndSpeed = this.DisplayLevelAndSpeedFormControl.value

		// save from the front pointer space to the non pointer space for serialization
		if (association == undefined) {
			// insertion point for translation/nullation of each pointers
		}

		if (id != 0 && association == undefined) {

			this.visualtrackService.updateVisualTrack(this.visualtrack)
				.subscribe(visualtrack => {
					this.visualtrackService.VisualTrackServiceChanged.next("update")
				});
		} else {
			switch (association) {
				// insertion point for saving value of ONE_MANY association reverse pointer
			}
			this.visualtrackService.postVisualTrack(this.visualtrack).subscribe(visualtrack => {

				this.visualtrackService.VisualTrackServiceChanged.next("post")

				this.visualtrack = {} // reset fields
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
			ID: this.visualtrack.ID,
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
			ID: this.visualtrack.ID,
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
		if (this.visualtrack.Name == undefined) {
			this.visualtrack.Name = event.value.Name
		}
	}

	toggleTextArea(fieldName: string) {
		if (this.mapFields_displayAsTextArea.has(fieldName)) {
			let displayAsTextArea = this.mapFields_displayAsTextArea.get(fieldName)
			this.mapFields_displayAsTextArea.set(fieldName, !displayAsTextArea)
		} else {
			this.mapFields_displayAsTextArea.set(fieldName, true)
		}
	}

	isATextArea(fieldName: string): boolean {
		if (this.mapFields_displayAsTextArea.has(fieldName)) {
			return this.mapFields_displayAsTextArea.get(fieldName)
		} else {
			return false
		}
	}

	compareObjects(o1: any, o2: any) {
		if (o1?.ID == o2?.ID) {
			return true;
		}
		else {
			return false
		}
	}
}
