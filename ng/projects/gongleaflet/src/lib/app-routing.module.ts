import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// insertion point for imports
import { DivIconsTableComponent } from './divicons-table/divicons-table.component'
import { DivIconDetailComponent } from './divicon-detail/divicon-detail.component'
import { DivIconPresentationComponent } from './divicon-presentation/divicon-presentation.component'

import { LayerGroupsTableComponent } from './layergroups-table/layergroups-table.component'
import { LayerGroupDetailComponent } from './layergroup-detail/layergroup-detail.component'
import { LayerGroupPresentationComponent } from './layergroup-presentation/layergroup-presentation.component'

import { MapOptionssTableComponent } from './mapoptionss-table/mapoptionss-table.component'
import { MapOptionsDetailComponent } from './mapoptions-detail/mapoptions-detail.component'
import { MapOptionsPresentationComponent } from './mapoptions-presentation/mapoptions-presentation.component'

import { MarkersTableComponent } from './markers-table/markers-table.component'
import { MarkerDetailComponent } from './marker-detail/marker-detail.component'
import { MarkerPresentationComponent } from './marker-presentation/marker-presentation.component'

import { VisualCirclesTableComponent } from './visualcircles-table/visualcircles-table.component'
import { VisualCircleDetailComponent } from './visualcircle-detail/visualcircle-detail.component'
import { VisualCirclePresentationComponent } from './visualcircle-presentation/visualcircle-presentation.component'

import { VisualLinesTableComponent } from './visuallines-table/visuallines-table.component'
import { VisualLineDetailComponent } from './visualline-detail/visualline-detail.component'
import { VisualLinePresentationComponent } from './visualline-presentation/visualline-presentation.component'

import { VisualTracksTableComponent } from './visualtracks-table/visualtracks-table.component'
import { VisualTrackDetailComponent } from './visualtrack-detail/visualtrack-detail.component'
import { VisualTrackPresentationComponent } from './visualtrack-presentation/visualtrack-presentation.component'


const routes: Routes = [ // insertion point for routes declarations
	{ path: 'github_com_fullstack_lang_gongleaflet_go-divicons', component: DivIconsTableComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_table' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-divicon-adder', component: DivIconDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-divicon-adder/:id/:originStruct/:originStructFieldName', component: DivIconDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-divicon-detail/:id', component: DivIconDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-divicon-presentation/:id', component: DivIconPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_presentation' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-divicon-presentation-special/:id', component: DivIconPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_godiviconpres' },

	{ path: 'github_com_fullstack_lang_gongleaflet_go-layergroups', component: LayerGroupsTableComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_table' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-layergroup-adder', component: LayerGroupDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-layergroup-adder/:id/:originStruct/:originStructFieldName', component: LayerGroupDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-layergroup-detail/:id', component: LayerGroupDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-layergroup-presentation/:id', component: LayerGroupPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_presentation' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-layergroup-presentation-special/:id', component: LayerGroupPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_golayergrouppres' },

	{ path: 'github_com_fullstack_lang_gongleaflet_go-mapoptionss', component: MapOptionssTableComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_table' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-mapoptions-adder', component: MapOptionsDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-mapoptions-adder/:id/:originStruct/:originStructFieldName', component: MapOptionsDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-mapoptions-detail/:id', component: MapOptionsDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-mapoptions-presentation/:id', component: MapOptionsPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_presentation' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-mapoptions-presentation-special/:id', component: MapOptionsPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_gomapoptionspres' },

	{ path: 'github_com_fullstack_lang_gongleaflet_go-markers', component: MarkersTableComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_table' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-marker-adder', component: MarkerDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-marker-adder/:id/:originStruct/:originStructFieldName', component: MarkerDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-marker-detail/:id', component: MarkerDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-marker-presentation/:id', component: MarkerPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_presentation' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-marker-presentation-special/:id', component: MarkerPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_gomarkerpres' },

	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualcircles', component: VisualCirclesTableComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_table' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualcircle-adder', component: VisualCircleDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualcircle-adder/:id/:originStruct/:originStructFieldName', component: VisualCircleDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualcircle-detail/:id', component: VisualCircleDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualcircle-presentation/:id', component: VisualCirclePresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_presentation' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualcircle-presentation-special/:id', component: VisualCirclePresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_govisualcirclepres' },

	{ path: 'github_com_fullstack_lang_gongleaflet_go-visuallines', component: VisualLinesTableComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_table' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualline-adder', component: VisualLineDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualline-adder/:id/:originStruct/:originStructFieldName', component: VisualLineDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualline-detail/:id', component: VisualLineDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualline-presentation/:id', component: VisualLinePresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_presentation' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualline-presentation-special/:id', component: VisualLinePresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_govisuallinepres' },

	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualtracks', component: VisualTracksTableComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_table' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualtrack-adder', component: VisualTrackDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualtrack-adder/:id/:originStruct/:originStructFieldName', component: VisualTrackDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualtrack-detail/:id', component: VisualTrackDetailComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_editor' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualtrack-presentation/:id', component: VisualTrackPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_go_presentation' },
	{ path: 'github_com_fullstack_lang_gongleaflet_go-visualtrack-presentation-special/:id', component: VisualTrackPresentationComponent, outlet: 'github_com_fullstack_lang_gongleaflet_govisualtrackpres' },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
