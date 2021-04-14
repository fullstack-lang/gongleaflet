import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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


const routes: Routes = [ // insertion point for routes declarations
	{ path: 'visualcenters', component: VisualCentersTableComponent, outlet: 'table' },
	{ path: 'visualcenter-adder', component: VisualCenterDetailComponent, outlet: 'editor' },
	{ path: 'visualcenter-adder/:id/:association', component: VisualCenterDetailComponent, outlet: 'editor' },
	{ path: 'visualcenter-detail/:id', component: VisualCenterDetailComponent, outlet: 'editor' },
	{ path: 'visualcenter-presentation/:id', component: VisualCenterPresentationComponent, outlet: 'presentation' },
	{ path: 'visualcenter-presentation-special/:id', component: VisualCenterPresentationComponent, outlet: 'visualcenterpres' },

	{ path: 'visualcircles', component: VisualCirclesTableComponent, outlet: 'table' },
	{ path: 'visualcircle-adder', component: VisualCircleDetailComponent, outlet: 'editor' },
	{ path: 'visualcircle-adder/:id/:association', component: VisualCircleDetailComponent, outlet: 'editor' },
	{ path: 'visualcircle-detail/:id', component: VisualCircleDetailComponent, outlet: 'editor' },
	{ path: 'visualcircle-presentation/:id', component: VisualCirclePresentationComponent, outlet: 'presentation' },
	{ path: 'visualcircle-presentation-special/:id', component: VisualCirclePresentationComponent, outlet: 'visualcirclepres' },

	{ path: 'visualicons', component: VisualIconsTableComponent, outlet: 'table' },
	{ path: 'visualicon-adder', component: VisualIconDetailComponent, outlet: 'editor' },
	{ path: 'visualicon-adder/:id/:association', component: VisualIconDetailComponent, outlet: 'editor' },
	{ path: 'visualicon-detail/:id', component: VisualIconDetailComponent, outlet: 'editor' },
	{ path: 'visualicon-presentation/:id', component: VisualIconPresentationComponent, outlet: 'presentation' },
	{ path: 'visualicon-presentation-special/:id', component: VisualIconPresentationComponent, outlet: 'visualiconpres' },

	{ path: 'visuallayers', component: VisualLayersTableComponent, outlet: 'table' },
	{ path: 'visuallayer-adder', component: VisualLayerDetailComponent, outlet: 'editor' },
	{ path: 'visuallayer-adder/:id/:association', component: VisualLayerDetailComponent, outlet: 'editor' },
	{ path: 'visuallayer-detail/:id', component: VisualLayerDetailComponent, outlet: 'editor' },
	{ path: 'visuallayer-presentation/:id', component: VisualLayerPresentationComponent, outlet: 'presentation' },
	{ path: 'visuallayer-presentation-special/:id', component: VisualLayerPresentationComponent, outlet: 'visuallayerpres' },

	{ path: 'visuallines', component: VisualLinesTableComponent, outlet: 'table' },
	{ path: 'visualline-adder', component: VisualLineDetailComponent, outlet: 'editor' },
	{ path: 'visualline-adder/:id/:association', component: VisualLineDetailComponent, outlet: 'editor' },
	{ path: 'visualline-detail/:id', component: VisualLineDetailComponent, outlet: 'editor' },
	{ path: 'visualline-presentation/:id', component: VisualLinePresentationComponent, outlet: 'presentation' },
	{ path: 'visualline-presentation-special/:id', component: VisualLinePresentationComponent, outlet: 'visuallinepres' },

	{ path: 'visualmaps', component: VisualMapsTableComponent, outlet: 'table' },
	{ path: 'visualmap-adder', component: VisualMapDetailComponent, outlet: 'editor' },
	{ path: 'visualmap-adder/:id/:association', component: VisualMapDetailComponent, outlet: 'editor' },
	{ path: 'visualmap-detail/:id', component: VisualMapDetailComponent, outlet: 'editor' },
	{ path: 'visualmap-presentation/:id', component: VisualMapPresentationComponent, outlet: 'presentation' },
	{ path: 'visualmap-presentation-special/:id', component: VisualMapPresentationComponent, outlet: 'visualmappres' },

	{ path: 'visualtracks', component: VisualTracksTableComponent, outlet: 'table' },
	{ path: 'visualtrack-adder', component: VisualTrackDetailComponent, outlet: 'editor' },
	{ path: 'visualtrack-adder/:id/:association', component: VisualTrackDetailComponent, outlet: 'editor' },
	{ path: 'visualtrack-detail/:id', component: VisualTrackDetailComponent, outlet: 'editor' },
	{ path: 'visualtrack-presentation/:id', component: VisualTrackPresentationComponent, outlet: 'presentation' },
	{ path: 'visualtrack-presentation-special/:id', component: VisualTrackPresentationComponent, outlet: 'visualtrackpres' },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
