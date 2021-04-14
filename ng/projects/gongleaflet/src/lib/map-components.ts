// insertion point sub template for components imports 
import { VisualCentersTableComponent } from './visualcenters-table/visualcenters-table.component'
import { VisualCirclesTableComponent } from './visualcircles-table/visualcircles-table.component'
import { VisualIconsTableComponent } from './visualicons-table/visualicons-table.component'
import { VisualLayersTableComponent } from './visuallayers-table/visuallayers-table.component'
import { VisualLinesTableComponent } from './visuallines-table/visuallines-table.component'
import { VisualMapsTableComponent } from './visualmaps-table/visualmaps-table.component'
import { VisualTracksTableComponent } from './visualtracks-table/visualtracks-table.component'

// insertion point sub template for map of components per struct 
export const MapOfVisualCentersComponents: Map<string, any> = new Map([["VisualCentersTableComponent", VisualCentersTableComponent],])
export const MapOfVisualCirclesComponents: Map<string, any> = new Map([["VisualCirclesTableComponent", VisualCirclesTableComponent],])
export const MapOfVisualIconsComponents: Map<string, any> = new Map([["VisualIconsTableComponent", VisualIconsTableComponent],])
export const MapOfVisualLayersComponents: Map<string, any> = new Map([["VisualLayersTableComponent", VisualLayersTableComponent],])
export const MapOfVisualLinesComponents: Map<string, any> = new Map([["VisualLinesTableComponent", VisualLinesTableComponent],])
export const MapOfVisualMapsComponents: Map<string, any> = new Map([["VisualMapsTableComponent", VisualMapsTableComponent],])
export const MapOfVisualTracksComponents: Map<string, any> = new Map([["VisualTracksTableComponent", VisualTracksTableComponent],])

// map of all ng components of the stacks
export const MapOfComponents: Map<string, any> =
  new Map(
    [
      // insertion point sub template for map of components 
      ["VisualCenter", MapOfVisualCentersComponents],
      ["VisualCircle", MapOfVisualCirclesComponents],
      ["VisualIcon", MapOfVisualIconsComponents],
      ["VisualLayer", MapOfVisualLayersComponents],
      ["VisualLine", MapOfVisualLinesComponents],
      ["VisualMap", MapOfVisualMapsComponents],
      ["VisualTrack", MapOfVisualTracksComponents],
    ]
  )