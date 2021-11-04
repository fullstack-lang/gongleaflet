
import { MapoptionsComponent, DEFAULT_ICON_SIZE }  from './mapoptions.component'
import 'leaflet-rotatedmarker';
import * as gongleaflet from 'gongleaflet';
import * as manageLeafletItems from './manage-leaflet-items';
import * as L from 'leaflet';
import { of } from 'rxjs';


export function refreshMapWithMarkers(mapOptions: MapoptionsComponent) {
    mapOptions.frontRepoService.pull().subscribe(
      (frontRepo: gongleaflet.FrontRepo) => {
        mapOptions.frontRepo = frontRepo

        // get layers of the map
        // get all gong LayerGroups, and add them to the "layerGroup"
        for (let gongLayerGroup of mapOptions.frontRepo.LayerGroups_array) {

          // if not present, create a leaflet layer group and add it to the root
          let leafletLayerGroup = mapOptions.mapGongLayerGroupID_LayerGroup.get(gongLayerGroup.ID)
          if (!leafletLayerGroup) {
            leafletLayerGroup = new L.LayerGroup<L.Marker>()
            mapOptions.rootOfLayerGroups.push(leafletLayerGroup)
            mapOptions.mapGongLayerGroupID_LayerGroup.set(gongLayerGroup.ID, leafletLayerGroup)
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
        for( let marker of mapOptions.frontRepo.Markers_array) {

          // check wether the layer of the marker is part of the map
          let markerLayerGroup = marker.LayerGroup
          if( markerLayerGroup) {
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
              let leafletLayer = mapOptions.mapGongLayerGroupID_LayerGroup.get(groupLayerID)
              if (leafletLayer) {
                leafletMarker.addTo(leafletLayer)
              }
            }

            mapOptions.mapMarkerID_LeafletMarker.set(marker.ID, leafletMarker)
          }
        }
      }
    )
  }