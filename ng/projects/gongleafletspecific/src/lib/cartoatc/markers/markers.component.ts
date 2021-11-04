import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import * as gongleaflet from 'gongleaflet';

import { DEFAULT_ICON_SIZE } from '../cartoatc.component'

import * as manageLeafletItems from '../manage-leaflet-items';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'markers-component',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.scss'],
})
export class MarkersComponent implements OnInit {

  // mapMap
  @Input() mapName!: string

  // store relation between the Markers & the markers
  mapMarkerID_LeafletMarker = new Map<number, L.Marker>();

  gongleafletFrontRepo?: gongleaflet.FrontRepo

  // root of layerGroups
  markersRootLayer: Array<L.Layer> = [];
  // markersRootLayer: L.LayerGroup<L.Marker | L.LayerGroup<L.Marker>> = new L.LayerGroup<L.Marker | L.LayerGroup<L.Marker>>()

  // 
  map_divIconID_divIconSVG = new Map<number, string>();

  // map between a gong layerGroup ID and a leaflet L.LayerGroup
  mapGongLayerGroupID_LayerGroup = new Map<number, L.LayerGroup<L.Marker>>();

  // ngOnChanges(changes: SimpleChanges) {
  //   const log: string[] = [];
  //   for (const propName in changes) {
  //     const changedProp = changes[propName];
  //     const to = JSON.stringify(changedProp.currentValue);
  //     if (changedProp.isFirstChange()) {
  //       console.log(`Initial value of ${propName} set to ${to}`)
  //       log.push(`Initial value of ${propName} set to ${to}`);
  //     } else {
  //       const from = JSON.stringify(changedProp.previousValue);
  //       console.log(`${propName} changed from ${from} to ${to}`)
  //       log.push(`${propName} changed from ${from} to ${to}`);
  //     }
  //   }
  // }

  constructor(
    private gongleafletFrontRepoService: gongleaflet.FrontRepoService,
    private markerService: gongleaflet.MarkerService,
  ) { }

  ngOnInit(): void {

    console.log("Markers mapName at OnInit is " + this.mapName)

    this.refreshMapWithMarkers()

    this.markerService.MarkerServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refreshMapWithMarkers()
        }
      })
  }

  refreshMapWithMarkers() {
    this.gongleafletFrontRepoService.pull().subscribe(
      gongleafletFrontRepo => {
        this.gongleafletFrontRepo = gongleafletFrontRepo

        // get layers
        // get all gong LayerGroups, and add them to the "layerGroup"
        for (let gongLayerGroup of this.gongleafletFrontRepo.LayerGroups_array) {

          // if not present, create a leaflet layer group
          if (!this.mapGongLayerGroupID_LayerGroup.has(gongLayerGroup.ID)) {
            let leafletLayerGroup = new L.LayerGroup<L.Marker>()
            this.markersRootLayer.push(leafletLayerGroup)
            this.mapGongLayerGroupID_LayerGroup.set(gongLayerGroup.ID, leafletLayerGroup)
          }
        }

        this.gongleafletFrontRepo.DivIcons.forEach((divIcon) => {
          if (!this.map_divIconID_divIconSVG.has(divIcon.ID)) {
            this.map_divIconID_divIconSVG.set(divIcon.ID, divIcon.SVG);
          }
        });

        this.gongleafletFrontRepo.Markers.forEach((marker) => {

          if (!this.mapMarkerID_LeafletMarker.has(marker.ID)) {
            var color = manageLeafletItems.getColor(marker.ColorEnum);

            var icon: L.DivIcon = manageLeafletItems.newIcon(
              marker.ID,
              'layer-' + marker.LayerGroupID.Int64,
              this.map_divIconID_divIconSVG.get(marker.DivIconID.Int64)!,
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

            // this.markersRootLayer.push(leafletMarker)

            // get the GroupLayer of the marker and add it to the layer
            let groupLayerID = marker.LayerGroup?.ID
            if (groupLayerID) {
              let leafletLayer = this.mapGongLayerGroupID_LayerGroup.get(groupLayerID)
              if (leafletLayer) {
                leafletMarker.addTo(leafletLayer)
              }
            }

            this.mapMarkerID_LeafletMarker.set(marker.ID, leafletMarker)
          }
        })
      }
    )
  }
}
