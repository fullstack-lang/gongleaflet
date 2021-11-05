
import { MapoptionsComponent, DEFAULT_ICON_SIZE } from './mapoptions.component'
import 'leaflet-rotatedmarker';
import * as gongleaflet from 'gongleaflet';
import * as manageLeafletItems from './manage-leaflet-items';
import * as L from 'leaflet';
import { of } from 'rxjs';


// refreshMapWithMarkers aligns leaflet objects on the gong frontRepo
//
// 1. maintain all LayerGroups
// 2. According to the LayerGroupsUse of the mapOptions, AddTo() or RemoveTo() each leaflet LayersGroup to the root of the Layers 
// 3. manage all gongleaflet Markers according to the gong Makers (CREATE, UPDATE, DELETE)
export function refreshMapWithMarkers(mapOptions: MapoptionsComponent) {

  if (mapOptions.frontRepo) {

    // for all possible gong LayersGroup, maintain a leaflet LayerGroups in the map
    for (let gongLayerGroup of mapOptions.frontRepo.LayerGroups_array) {

      // if not present, create a leaflet layer group and add it to the root
      let leafletLayerGroup = mapOptions.mapGongLayerGroupID_LeafletLayerGroup.get(gongLayerGroup.ID)
      if (!leafletLayerGroup) {
        leafletLayerGroup = new L.LayerGroup<L.Marker>()
        mapOptions.mapGongLayerGroupID_LeafletLayerGroup.set(gongLayerGroup.ID, leafletLayerGroup)
      }
    }

    // Management of layers.
    //
    // 1. get all layerGroupUse by the mapOption and store them in the map "mapGongLayerGroupID_LayerGroup"
    // of layers that have to be displayed
    //
    // 2. parse all layersGroup of the front. 
    // If the LayerGroupID is present and to be displayed, add it to the root of LayersGroup
    // If not, remove it from the root of LayersGroup if it is present

    // reset the map of layers that have to be displayed on this map
    mapOptions.mapGongLayerGroupID_LayerGroupUse.clear()

    // populate the map with information from layerGroupUse of the mapOptions with display==true
    for (let gongLayerGroupUse of mapOptions.frontRepo.LayerGroupUses_array) {

      if (gongLayerGroupUse.Display) {
        let gongLayerGroup = gongLayerGroupUse.LayerGroup
        if (gongLayerGroup) {
          mapOptions.mapGongLayerGroupID_LayerGroupUse.set(gongLayerGroup.ID, gongLayerGroupUse)
        }
      }
    }

    // parse all LayerGroup. If it is present in the map of LayerGroup that have to be displayed
    // add them to the root of LayerGroup. If it is absent, remove them
    for (let gongLayerGroup of mapOptions.frontRepo.LayerGroups_array) {

      // get the leaflet layer group
      let leafletLayerGroup = mapOptions.mapGongLayerGroupID_LeafletLayerGroup.get(gongLayerGroup.ID)

      // the gong layerGroup is not present in the map
      if (!leafletLayerGroup) {
        console.log("map " + mapOptions.mapName + " gong layer group named " + gongLayerGroup.Name + " has no leaflet layer group ")

        // We supppose that the association MapOptions-->LayerGroupUse-->LayerGroup is set at init and
        // will not change
        // TO BE DONE. manage evolving association
        /// Check if the leaflet layerGroup is in the root of layers groups. In this case, remove it
        continue
      }

      //
      // for each leaflet layerGroup, the algo can do three things
      // 1. Nothing
      //   a. because it is not present and it has to be hidden
      //   b. because it is present and it has to be added
      // 2. Add it to the root of layer groups
      //   a. because it is not present and it has to be added
      // 3. Remove it from the root of layer groups
      //   a. because it is present and it has to be removed

      // is the leaflet layerGroup in the root of layer groups ?
      // if it is there, no need to add it if it has to be displayed
      // but there is a need to remove it if it has not to be displayed
      let layerAlreadyDisplayed = mapOptions.rootOfLayerGroups.find(present => present == leafletLayerGroup)

      let hasToBeRemoved: boolean = false
      let hasToBeAdded: boolean = false

      // 
      let gongLayerGroupUse = mapOptions.mapGongLayerGroupID_LayerGroupUse.get(gongLayerGroup.ID)

      // does the LayerGroup has to be displayed ?
      if (gongLayerGroupUse?.Display) {
        // The layer group has to be displayed

        // if the leaflet not layer already in the root of all LayerGroup, add it
        if (!layerAlreadyDisplayed) {
          hasToBeAdded = true
        }
      } else {
        // the layer has to be hidden
        // is it present ?
        if (layerAlreadyDisplayed) {
          hasToBeRemoved = true
        }
      }

      // performed computed operation
      if (hasToBeAdded) {
        console.log("map " + mapOptions.mapName + " has to add layer group named " + gongLayerGroup.Name)
        mapOptions.rootOfLayerGroups.push(leafletLayerGroup)
      }

      if (hasToBeRemoved) {
        console.log("map " + mapOptions.mapName + " has to remove layer group named " + gongLayerGroup.Name)
        mapOptions.rootOfLayerGroups.forEach((element, index) => {
          if (element == layerAlreadyDisplayed) mapOptions.rootOfLayerGroups.splice(index, 1);
        });
      }
    }



    mapOptions.frontRepo.DivIcons.forEach((divIcon) => {
      if (!mapOptions.map_divIconID_divIconSVG.has(divIcon.ID)) {
        mapOptions.map_divIconID_divIconSVG.set(divIcon.ID, divIcon.SVG);
      }
    });

    //
    // parse all markers
    //
    for (let marker of mapOptions.frontRepo.Markers_array) {

      // check wether the layer of the marker is part of the map
      let markerLayerGroup = marker.LayerGroup
      if (markerLayerGroup) {
        let markerLayerGroupUse = mapOptions.mapGongLayerGroupID_LayerGroupUse.get(markerLayerGroup.ID)

        if (!markerLayerGroupUse) {
          continue
        } else {
          if (markerLayerGroupUse.Display == false) {
            continue
          }
        }
      }

      if (!mapOptions.mapMarkerID_LeafletMarker.has(marker.ID)) {
        var color = manageLeafletItems.getColor(marker.ColorEnum);

        var icon: L.DivIcon = manageLeafletItems.newIcon(
          marker.ID,
          'layer-' + marker.LayerGroupID.Int64,
          mapOptions.map_divIconID_divIconSVG.get(marker.DivIconID.Int64)!,
          DEFAULT_ICON_SIZE,
          color,
          marker.Name
        );
        var leafletMarker: L.Marker
        leafletMarker = manageLeafletItems.newMarkerWithIcon(
          marker.Lat,
          marker.Lng,
          icon
        )

        // mapOptions.markersRootLayer.push(leafletMarker)

        // get the GroupLayer of the marker and add it to the layer
        let groupLayerID = marker.LayerGroup?.ID
        if (groupLayerID) {
          let leafletLayer = mapOptions.mapGongLayerGroupID_LeafletLayerGroup.get(groupLayerID)
          if (leafletLayer) {
            leafletMarker.addTo(leafletLayer)
          }
        }

        mapOptions.mapMarkerID_LeafletMarker.set(marker.ID, leafletMarker)
      }
    }
  }
}