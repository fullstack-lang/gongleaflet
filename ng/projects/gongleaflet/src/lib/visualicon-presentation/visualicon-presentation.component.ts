import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { VisualIconDB } from '../visualicon-db'
import { VisualIconService } from '../visualicon.service'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

export interface visualiconDummyElement {
}

const ELEMENT_DATA: visualiconDummyElement[] = [
];

@Component({
	selector: 'app-visualicon-presentation',
	templateUrl: './visualicon-presentation.component.html',
	styleUrls: ['./visualicon-presentation.component.css'],
})
export class VisualIconPresentationComponent implements OnInit {

	// insertion point for declarations

	displayedColumns: string[] = [];
	dataSource = ELEMENT_DATA;

	visualicon: VisualIconDB;
 
	constructor(
		private visualiconService: VisualIconService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
	}

	ngOnInit(): void {
		this.getVisualIcon();

		// observable for changes in 
		this.visualiconService.VisualIconServiceChanged.subscribe(
			message => {
				if (message == "update") {
					this.getVisualIcon()
				}
			}
		)
	}

	getVisualIcon(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.visualiconService.getVisualIcon(id)
			.subscribe(
				visualicon => {
					this.visualicon = visualicon

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
				editor: ["visualicon-detail", ID]
			}
		}]);
	}
}
