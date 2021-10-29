// insertion point sub template for components imports 
  import { DivIconsTableComponent } from './divicons-table/divicons-table.component'
  import { DivIconSortingComponent } from './divicon-sorting/divicon-sorting.component'
  import { MarkersTableComponent } from './markers-table/markers-table.component'
  import { MarkerSortingComponent } from './marker-sorting/marker-sorting.component'
  import { VisualCirclesTableComponent } from './visualcircles-table/visualcircles-table.component'
  import { VisualCircleSortingComponent } from './visualcircle-sorting/visualcircle-sorting.component'
  import { VisualLayersTableComponent } from './visuallayers-table/visuallayers-table.component'
  import { VisualLayerSortingComponent } from './visuallayer-sorting/visuallayer-sorting.component'
  import { VisualLinesTableComponent } from './visuallines-table/visuallines-table.component'
  import { VisualLineSortingComponent } from './visualline-sorting/visualline-sorting.component'
  import { VisualMapsTableComponent } from './visualmaps-table/visualmaps-table.component'
  import { VisualMapSortingComponent } from './visualmap-sorting/visualmap-sorting.component'
  import { VisualTracksTableComponent } from './visualtracks-table/visualtracks-table.component'
  import { VisualTrackSortingComponent } from './visualtrack-sorting/visualtrack-sorting.component'

// insertion point sub template for map of components per struct 
  export const MapOfDivIconsComponents: Map<string, any> = new Map([["DivIconsTableComponent", DivIconsTableComponent],])
  export const MapOfDivIconSortingComponents: Map<string, any> = new Map([["DivIconSortingComponent", DivIconSortingComponent],])
  export const MapOfMarkersComponents: Map<string, any> = new Map([["MarkersTableComponent", MarkersTableComponent],])
  export const MapOfMarkerSortingComponents: Map<string, any> = new Map([["MarkerSortingComponent", MarkerSortingComponent],])
  export const MapOfVisualCirclesComponents: Map<string, any> = new Map([["VisualCirclesTableComponent", VisualCirclesTableComponent],])
  export const MapOfVisualCircleSortingComponents: Map<string, any> = new Map([["VisualCircleSortingComponent", VisualCircleSortingComponent],])
  export const MapOfVisualLayersComponents: Map<string, any> = new Map([["VisualLayersTableComponent", VisualLayersTableComponent],])
  export const MapOfVisualLayerSortingComponents: Map<string, any> = new Map([["VisualLayerSortingComponent", VisualLayerSortingComponent],])
  export const MapOfVisualLinesComponents: Map<string, any> = new Map([["VisualLinesTableComponent", VisualLinesTableComponent],])
  export const MapOfVisualLineSortingComponents: Map<string, any> = new Map([["VisualLineSortingComponent", VisualLineSortingComponent],])
  export const MapOfVisualMapsComponents: Map<string, any> = new Map([["VisualMapsTableComponent", VisualMapsTableComponent],])
  export const MapOfVisualMapSortingComponents: Map<string, any> = new Map([["VisualMapSortingComponent", VisualMapSortingComponent],])
  export const MapOfVisualTracksComponents: Map<string, any> = new Map([["VisualTracksTableComponent", VisualTracksTableComponent],])
  export const MapOfVisualTrackSortingComponents: Map<string, any> = new Map([["VisualTrackSortingComponent", VisualTrackSortingComponent],])

// map of all ng components of the stacks
export const MapOfComponents: Map<string, any> =
  new Map(
    [
      // insertion point sub template for map of components 
      ["DivIcon", MapOfDivIconsComponents],
      ["Marker", MapOfMarkersComponents],
      ["VisualCircle", MapOfVisualCirclesComponents],
      ["VisualLayer", MapOfVisualLayersComponents],
      ["VisualLine", MapOfVisualLinesComponents],
      ["VisualMap", MapOfVisualMapsComponents],
      ["VisualTrack", MapOfVisualTracksComponents],
    ]
  )

// map of all ng components of the stacks
export const MapOfSortingComponents: Map<string, any> =
  new Map(
    [
    // insertion point sub template for map of sorting components 
      ["DivIcon", MapOfDivIconSortingComponents],
      ["Marker", MapOfMarkerSortingComponents],
      ["VisualCircle", MapOfVisualCircleSortingComponents],
      ["VisualLayer", MapOfVisualLayerSortingComponents],
      ["VisualLine", MapOfVisualLineSortingComponents],
      ["VisualMap", MapOfVisualMapSortingComponents],
      ["VisualTrack", MapOfVisualTrackSortingComponents],
    ]
  )
