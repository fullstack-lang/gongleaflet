import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// for angular material
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';

import { AngularSplitModule, SplitComponent } from 'angular-split';

import { AppRoutingModule } from './app-routing.module';

import { SplitterComponent } from './splitter/splitter.component'
import { SidebarComponent } from './sidebar/sidebar.component';

// insertion point for imports 
import { VisualCentersTableComponent } from './visualcenters-table/visualcenters-table.component'
import { VisualCenterDetailComponent } from './visualcenter-detail/visualcenter-detail.component'
import { VisualCenterPresentationComponent } from './visualcenter-presentation/visualcenter-presentation.component'

import { VisualCirclesTableComponent } from './visualcircles-table/visualcircles-table.component'
import { VisualCircleDetailComponent } from './visualcircle-detail/visualcircle-detail.component'
import { VisualCirclePresentationComponent } from './visualcircle-presentation/visualcircle-presentation.component'

import { VisualIconsTableComponent } from './visualicons-table/visualicons-table.component'
import { VisualIconDetailComponent } from './visualicon-detail/visualicon-detail.component'
import { VisualIconPresentationComponent } from './visualicon-presentation/visualicon-presentation.component'

import { VisualLayersTableComponent } from './visuallayers-table/visuallayers-table.component'
import { VisualLayerDetailComponent } from './visuallayer-detail/visuallayer-detail.component'
import { VisualLayerPresentationComponent } from './visuallayer-presentation/visuallayer-presentation.component'

import { VisualLinesTableComponent } from './visuallines-table/visuallines-table.component'
import { VisualLineDetailComponent } from './visualline-detail/visualline-detail.component'
import { VisualLinePresentationComponent } from './visualline-presentation/visualline-presentation.component'

import { VisualMapsTableComponent } from './visualmaps-table/visualmaps-table.component'
import { VisualMapDetailComponent } from './visualmap-detail/visualmap-detail.component'
import { VisualMapPresentationComponent } from './visualmap-presentation/visualmap-presentation.component'

import { VisualTracksTableComponent } from './visualtracks-table/visualtracks-table.component'
import { VisualTrackDetailComponent } from './visualtrack-detail/visualtrack-detail.component'
import { VisualTrackPresentationComponent } from './visualtrack-presentation/visualtrack-presentation.component'


@NgModule({
	declarations: [
		// insertion point for declarations 
		VisualCentersTableComponent,
		VisualCenterDetailComponent,
		VisualCenterPresentationComponent,

		VisualCirclesTableComponent,
		VisualCircleDetailComponent,
		VisualCirclePresentationComponent,

		VisualIconsTableComponent,
		VisualIconDetailComponent,
		VisualIconPresentationComponent,

		VisualLayersTableComponent,
		VisualLayerDetailComponent,
		VisualLayerPresentationComponent,

		VisualLinesTableComponent,
		VisualLineDetailComponent,
		VisualLinePresentationComponent,

		VisualMapsTableComponent,
		VisualMapDetailComponent,
		VisualMapPresentationComponent,

		VisualTracksTableComponent,
		VisualTrackDetailComponent,
		VisualTrackPresentationComponent,


		SplitterComponent,
		SidebarComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		RouterModule,

		AppRoutingModule,

		MatSliderModule,
		MatSelectModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatTableModule,
		MatCheckboxModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatExpansionModule,
		MatListModule,
		MatDialogModule,
		MatGridListModule,
		MatTreeModule,

		AngularSplitModule,
	],
	exports: [
		// insertion point for declarations 
		VisualCentersTableComponent,
		VisualCenterDetailComponent,
		VisualCenterPresentationComponent,

		VisualCirclesTableComponent,
		VisualCircleDetailComponent,
		VisualCirclePresentationComponent,

		VisualIconsTableComponent,
		VisualIconDetailComponent,
		VisualIconPresentationComponent,

		VisualLayersTableComponent,
		VisualLayerDetailComponent,
		VisualLayerPresentationComponent,

		VisualLinesTableComponent,
		VisualLineDetailComponent,
		VisualLinePresentationComponent,

		VisualMapsTableComponent,
		VisualMapDetailComponent,
		VisualMapPresentationComponent,

		VisualTracksTableComponent,
		VisualTrackDetailComponent,
		VisualTrackPresentationComponent,


		SplitterComponent,
		SidebarComponent,

	],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {}
		},
	],
})
export class GongleafletModule { }
