import { Component, Input, OnInit } from '@angular/core';

import * as gongleaflet from 'gongleaflet';

import { DEFAULT_ICON_SIZE } from '../cartoatc.component'

import * as manageLeafletItems from '../manage-leaflet-items';
import * as L from 'leaflet';

@Component({
  selector: 'app-cartoatc-centers',
  templateUrl: './cartoatc-centers.component.html',
  styleUrls: ['./cartoatc-centers.component.scss'],
})
export class CartoatcCentersComponent implements OnInit {

  // store relation between the Markers & the markers
  mapMarkerID_LeafletMarker = new Map<number, L.Marker>();

  gongleafletFrontRepo?: gongleaflet.FrontRepo

  centersLayer: Array<L.Layer> = [];
  map_divIconID_divIconSVG = new Map<number, string>();

  constructor(
    private gongleafletFrontRepoService: gongleaflet.FrontRepoService,
    private markerService: gongleaflet.MarkerService,
    private divIcon: gongleaflet.DivIconService
  ) { }

  ngOnInit(): void {
    this.refreshMapWithVisualCircle()

    this.markerService.MarkerServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refreshMapWithVisualCircle()
        }
      })
  }

  refreshMapWithVisualCircle() {
    this.gongleafletFrontRepoService.pull().subscribe(
      gongleafletFrontRepo => {
        this.gongleafletFrontRepo = gongleafletFrontRepo

        this.gongleafletFrontRepo.DivIcons.forEach((divIcon) => {
          if (!this.map_divIconID_divIconSVG.has(divIcon.ID)) {
            this.map_divIconID_divIconSVG.set(divIcon.ID, divIcon.SVG);
          }
        });

        this.gongleafletFrontRepo.Markers.forEach((marker) => {

          if (!this.mapMarkerID_LeafletMarker.has(marker.ID)) {
            var color = manageLeafletItems.getColor(marker.VisualColorEnum);

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
            );
            this.centersLayer.push(leafletMarker);

            this.mapMarkerID_LeafletMarker.set(marker.ID, leafletMarker)
          }
        })
      }
    )
  }
}
