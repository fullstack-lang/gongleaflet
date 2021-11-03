// insertion point sub template for components imports 
  import { DivIconsTableComponent } from './divicons-table/divicons-table.component'
  import { DivIconSortingComponent } from './divicon-sorting/divicon-sorting.component'
  import { LayerGroupsTableComponent } from './layergroups-table/layergroups-table.component'
  import { LayerGroupSortingComponent } from './layergroup-sorting/layergroup-sorting.component'
  import { MapOptionssTableComponent } from './mapoptionss-table/mapoptionss-table.component'
  import { MapOptionsSortingComponent } from './mapoptions-sorting/mapoptions-sorting.component'
  import { MarkersTableComponent } from './markers-table/markers-table.component'
  import { MarkerSortingComponent } from './marker-sorting/marker-sorting.component'
  import { VisualCirclesTableComponent } from './visualcircles-table/visualcircles-table.component'
  import { VisualCircleSortingComponent } from './visualcircle-sorting/visualcircle-sorting.component'
  import { VisualLinesTableComponent } from './visuallines-table/visuallines-table.component'
  import { VisualLineSortingComponent } from './visualline-sorting/visualline-sorting.component'
  import { VisualTracksTableComponent } from './visualtracks-table/visualtracks-table.component'
  import { VisualTrackSortingComponent } from './visualtrack-sorting/visualtrack-sorting.component'

// insertion point sub template for map of components per struct 
  export const MapOfDivIconsComponents: Map<string, any> = new Map([["DivIconsTableComponent", DivIconsTableComponent],])
  export const MapOfDivIconSortingComponents: Map<string, any> = new Map([["DivIconSortingComponent", DivIconSortingComponent],])
  export const MapOfLayerGroupsComponents: Map<string, any> = new Map([["LayerGroupsTableComponent", LayerGroupsTableComponent],])
  export const MapOfLayerGroupSortingComponents: Map<string, any> = new Map([["LayerGroupSortingComponent", LayerGroupSortingComponent],])
  export const MapOfMapOptionssComponents: Map<string, any> = new Map([["MapOptionssTableComponent", MapOptionssTableComponent],])
  export const MapOfMapOptionsSortingComponents: Map<string, any> = new Map([["MapOptionsSortingComponent", MapOptionsSortingComponent],])
  export const MapOfMarkersComponents: Map<string, any> = new Map([["MarkersTableComponent", MarkersTableComponent],])
  export const MapOfMarkerSortingComponents: Map<string, any> = new Map([["MarkerSortingComponent", MarkerSortingComponent],])
  export const MapOfVisualCirclesComponents: Map<string, any> = new Map([["VisualCirclesTableComponent", VisualCirclesTableComponent],])
  export const MapOfVisualCircleSortingComponents: Map<string, any> = new Map([["VisualCircleSortingComponent", VisualCircleSortingComponent],])
  export const MapOfVisualLinesComponents: Map<string, any> = new Map([["VisualLinesTableComponent", VisualLinesTableComponent],])
  export const MapOfVisualLineSortingComponents: Map<string, any> = new Map([["VisualLineSortingComponent", VisualLineSortingComponent],])
  export const MapOfVisualTracksComponents: Map<string, any> = new Map([["VisualTracksTableComponent", VisualTracksTableComponent],])
  export const MapOfVisualTrackSortingComponents: Map<string, any> = new Map([["VisualTrackSortingComponent", VisualTrackSortingComponent],])

// map of all ng components of the stacks
export const MapOfComponents: Map<string, any> =
  new Map(
    [
      // insertion point sub template for map of components 
      ["DivIcon", MapOfDivIconsComponents],
      ["LayerGroup", MapOfLayerGroupsComponents],
      ["MapOptions", MapOfMapOptionssComponents],
      ["Marker", MapOfMarkersComponents],
      ["VisualCircle", MapOfVisualCirclesComponents],
      ["VisualLine", MapOfVisualLinesComponents],
      ["VisualTrack", MapOfVisualTracksComponents],
    ]
  )

// map of all ng components of the stacks
export const MapOfSortingComponents: Map<string, any> =
  new Map(
    [
    // insertion point sub template for map of sorting components 
      ["DivIcon", MapOfDivIconSortingComponents],
      ["LayerGroup", MapOfLayerGroupSortingComponents],
      ["MapOptions", MapOfMapOptionsSortingComponents],
      ["Marker", MapOfMarkerSortingComponents],
      ["VisualCircle", MapOfVisualCircleSortingComponents],
      ["VisualLine", MapOfVisualLineSortingComponents],
      ["VisualTrack", MapOfVisualTrackSortingComponents],
    ]
  )
