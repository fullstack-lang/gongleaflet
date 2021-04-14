import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { VisualLayerDB } from '../visuallayer-db'
import { VisualLayerService } from '../visuallayer.service'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

export interface visuallayerDummyElement {
}

const ELEMENT_DATA: visuallayerDummyElement[] = [
];

@Component({
	selector: 'app-visuallayer-presentation',
	templateUrl: './visuallayer-presentation.component.html',
	styleUrls: ['./visuallayer-presentation.component.css'],
})
export class VisualLayerPresentationComponent implements OnInit {

	// insertion point for declarations

	displayedColumns: string[] = [];
	dataSource = ELEMENT_DATA;

	visuallayer: VisualLayerDB;
 
	constructor(
		private visuallayerService: VisualLayerService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
	}

	ngOnInit(): void {
		this.getVisualLayer();

		// observable for changes in 
		this.visuallayerService.VisualLayerServiceChanged.subscribe(
			message => {
				if (message == "update") {
					this.getVisualLayer()
				}
			}
		)
	}

	getVisualLayer(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.visuallayerService.getVisualLayer(id)
			.subscribe(
				visuallayer => {
					this.visuallayer = visuallayer

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
				editor: ["visuallayer-detail", ID]
			}
		}]);
	}
}
