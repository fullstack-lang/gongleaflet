import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { VisualCenterDB } from '../visualcenter-db'
import { VisualCenterService } from '../visualcenter.service'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

export interface visualcenterDummyElement {
}

const ELEMENT_DATA: visualcenterDummyElement[] = [
];

@Component({
	selector: 'app-visualcenter-presentation',
	templateUrl: './visualcenter-presentation.component.html',
	styleUrls: ['./visualcenter-presentation.component.css'],
})
export class VisualCenterPresentationComponent implements OnInit {

	// insertion point for declarations

	displayedColumns: string[] = [];
	dataSource = ELEMENT_DATA;

	visualcenter: VisualCenterDB;
 
	constructor(
		private visualcenterService: VisualCenterService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
	}

	ngOnInit(): void {
		this.getVisualCenter();

		// observable for changes in 
		this.visualcenterService.VisualCenterServiceChanged.subscribe(
			message => {
				if (message == "update") {
					this.getVisualCenter()
				}
			}
		)
	}

	getVisualCenter(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.visualcenterService.getVisualCenter(id)
			.subscribe(
				visualcenter => {
					this.visualcenter = visualcenter

					// insertion point for recovery of durations

				}
			);
	}

	// set presentation outlet
	setPresentationRouterOutlet(structName: string, ID: number) {
		this.router.navigate([{
			outlets: {
				presentation: [structName + "-presentation", ID]
			}
		}]);
	}

	// set editor outlet
	setEditorRouterOutlet(ID: number) {
		this.router.navigate([{
			outlets: {
				editor: ["visualcenter-detail", ID]
			}
		}]);
	}
}
