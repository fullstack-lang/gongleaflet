import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { VisualCircleDB } from '../visualcircle-db'
import { VisualCircleService } from '../visualcircle.service'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

export interface visualcircleDummyElement {
}

const ELEMENT_DATA: visualcircleDummyElement[] = [
];

@Component({
	selector: 'app-visualcircle-presentation',
	templateUrl: './visualcircle-presentation.component.html',
	styleUrls: ['./visualcircle-presentation.component.css'],
})
export class VisualCirclePresentationComponent implements OnInit {

	// insertion point for declarations

	displayedColumns: string[] = [];
	dataSource = ELEMENT_DATA;

	visualcircle: VisualCircleDB;
 
	constructor(
		private visualcircleService: VisualCircleService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
	}

	ngOnInit(): void {
		this.getVisualCircle();

		// observable for changes in 
		this.visualcircleService.VisualCircleServiceChanged.subscribe(
			message => {
				if (message == "update") {
					this.getVisualCircle()
				}
			}
		)
	}

	getVisualCircle(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.visualcircleService.getVisualCircle(id)
			.subscribe(
				visualcircle => {
					this.visualcircle = visualcircle

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
				editor: ["visualcircle-detail", ID]
			}
		}]);
	}
}
