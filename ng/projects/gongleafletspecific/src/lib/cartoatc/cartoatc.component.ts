import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, timer, Observable } from 'rxjs';

import * as L from 'leaflet';
import 'leaflet-rotatedmarker';

import * as gongleaflet from 'gongleaflet';

import * as manageLeafletItems from './manage-leaflet-items';

import { dotBlur } from '../../assets/icons/dot_blur';

export const DEFAULT_ICON_SIZE = 60

// CartoatcComponent is an angular component that is
// - the component that displays tracks
// - the root component of other components that display other elements (centers, lines, ...)
@Component({
  selector: 'app-cartoatc',
  templateUrl: './cartoatc.component.html',
  styleUrls: ['./cartoatc.component.scss'],
})
export class CartoatcComponent implements OnInit {

  // list of initial layers
  @Input() initialLayers!: string

  // name of the initial map
  @Input() mapName: string = ""

  // [leafletOptions]="mapOptions" is passed to the leaflet map in the html
  mapOptions?: L.MapOptions // stangely, impossible to type without ?

  // [leafletLayers]="layerGroups" is passed to one div in the html
  layerGroups: L.Layer[] = [];

  // passed to the html as layers [leafletLayers]="visualTracksHistory"
  visualTracksHistory: L.Layer[] = [];

  // map of visualTrack ID to visualTrackMarker in order to perform updates
  mapVisualTrackID_VisualMarker = new Map<number, L.Marker>();

  // map of visualTrackMarker to visualTrack ID in order to delete deleted visualTrack
  mapVisualMarker_VisualTrackID = new Map<L.Marker, number>();

  // TO BE REMOVED. currently, the tracks are managed as an attribute in the html object
  trackLayerID: number = 0

  // mapVisualTrackName_positionsHistory stores tracks histories
  mapVisualTrackName_positionsHistory: Map<string, Array<L.LatLng>> = new Map();

  // the gong front repo
  frontRepo?: gongleaflet.FrontRepo

  constructor(
    private frontRepoService: gongleaflet.FrontRepoService,
    private visualTrackService: gongleaflet.VisualTrackService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  // not yet clear what those lines mean
  // onMapReady(map: L.Map) {
  //   setTimeout(() => {
  //     map.invalidateSize();
  //   }, 0);
  // }

  ngOnInit(): void {

    console.log("layers name " + this.initialLayers)

    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        let mapOptions = Array.from(this.frontRepo.VisualMaps.values())[0]

        // if the map name is set, then map options might differ
        if (this.mapName != "") {
          for (let visualMap of this.frontRepo.VisualMaps.values()) {
            if (visualMap.Name == this.mapName) {
              mapOptions = visualMap
            }
          }

        }

        this.mapOptions = manageLeafletItems.visualMapToLeafletMapOptions(
          mapOptions
        );
      }
    )

    this.visualTrackService.VisualTrackServiceChanged.next('update');

    // update visual line when the data has changed
    // observable for changes in structs
    this.visualTrackService.VisualTrackServiceChanged.subscribe((message) => {
      if (message == 'post' || message == 'update' || message == 'delete') {

        // update track position by using the front repo
        this.frontRepoService.VisualTrackPull().subscribe(
          frontRepo => {

            this.frontRepo = frontRepo

            // update marker from visual track
            this.frontRepo.VisualTracks.forEach(
              (vTrack: gongleaflet.VisualTrackDB) => {
                let _currentMarker: L.Marker<any> = this.mapVisualTrackID_VisualMarker.get(vTrack.ID)!
                if (!_currentMarker) {
                  this.manageNewVisualTrackMarker(vTrack);
                } else {
                  this.manageUpdateVisualTrackMarker(vTrack, _currentMarker);
                }
              }
            );

            // remove markers tat have no visual tracks
            this.mapVisualMarker_VisualTrackID.forEach((visualTrackID) => {
              if (frontRepo.VisualTracks.get(visualTrackID) == undefined) {
                var marker = this.mapVisualTrackID_VisualMarker.get(
                  visualTrackID
                );

                // remove marker from the visual layer
                marker?.remove();

                this.mapVisualTrackID_VisualMarker.delete(visualTrackID);
                this.mapVisualMarker_VisualTrackID.delete(marker!);
              }
            });
          });
      }
    }
    )
  }

  // manageNewVisualTrackMarker takes a visualTrack and 
  // add a L.DivIcon to the 
  manageNewVisualTrackMarker(visualTrack: gongleaflet.VisualTrackDB) {
    var color = manageLeafletItems.getColor(visualTrack.VisualColorEnum);

    if (visualTrack.DivIcon) {
      var icon: L.DivIcon = manageLeafletItems.newIcon(
        visualTrack.ID + '-track',
        'layer-' + visualTrack.LayerGroupID.Int64,
        visualTrack.DivIcon.SVG,
        DEFAULT_ICON_SIZE,
        color,
        visualTrack.Name
      );
      var marker = manageLeafletItems.newMarkerWithIcon(
        visualTrack.Lat,
        visualTrack.Lng,
        icon
      );

      {
        // @ts-ignore: Unreachable code error
        marker.setRotationOrigin('center center');
      }

      manageLeafletItems.rotateIcon(
        visualTrack.ID + '-track',
        visualTrack.Heading
      );
      this.trackLayerID = visualTrack.LayerGroupID.Int64;

      this.mapVisualTrackID_VisualMarker.set(visualTrack.ID, marker);
      this.mapVisualMarker_VisualTrackID.set(marker, visualTrack.ID);
      this.layerGroups.push(marker);
    }
  }

  manageUpdateVisualTrackMarker(
    visualTrack: gongleaflet.VisualTrackDB,
    marker: L.Marker<any>
  ) {
    if (!visualTrack.Display) {
      marker.remove();
      return;
    }
    marker.setLatLng([visualTrack.Lat, visualTrack.Lng]);
    manageLeafletItems.setIconLabel(
      visualTrack.ID + '-track',
      this.formatTrackLabel(visualTrack)
    );
    manageLeafletItems.rotateIcon(
      visualTrack.ID + '-track',
      visualTrack.Heading
    );
    if (visualTrack.DisplayTrackHistory) {
      this.generateVisualTracksHistory(
        visualTrack.Name,
        L.latLng(visualTrack.Lat, visualTrack.Lng)
      );
      this.visualTracksHistory = this.renderTracksLayer;
    }
  }

  // generateVisualTracksHistory adds dots to the track
  generateVisualTracksHistory(trackName: string, coordinates: L.LatLng) {
    let trackHistory: L.LatLng[] = [];

    // get the track pas positions
    trackHistory = this.mapVisualTrackName_positionsHistory.get(trackName)!

    if (!trackHistory) {
      trackHistory = [];
    }
    if (trackHistory.length) {
      if (
        trackHistory[trackHistory.length - 1].lat !== coordinates.lat &&
        trackHistory[trackHistory.length - 1].lng !== coordinates.lng
      ) {
        trackHistory = addNewCoordToFIFO(trackHistory, coordinates);
      } else {
        if (trackHistory.length < LIMIT_HISTORY_LENGTH) {
          trackHistory.push(coordinates);
        }
      }
    } else {
      trackHistory.push(coordinates);
    }
    this.mapVisualTrackName_positionsHistory.set(trackName, trackHistory);
  }

  // renderTracksLayer computes 
  get renderTracksLayer(): Array<L.Layer> {
    let render: L.Layer[] = [];
    let icon = manageLeafletItems.newIcon(
      'icon',
      'layer-' + this.trackLayerID,
      dotBlur,
      5,
      '#004E92'
    );

    let trackNames = this.mapVisualTrackName_positionsHistory.values
    for (let trackName in trackNames) {
      let positionsHistory = this.mapVisualTrackName_positionsHistory.get(trackName)!

      for (let coordinates of positionsHistory) {
        let dotIcon = manageLeafletItems.newMarkerWithIcon(
          coordinates.lat,
          coordinates.lng,
          icon
        )
        render.push(
          manageLeafletItems.newMarkerWithIcon(
            coordinates.lat,
            coordinates.lng,
            icon
          )
        )
      }
    }
    // for (let latLng in trackHistory)

    this.mapVisualTrackName_positionsHistory.forEach((trackHistory) => {
      trackHistory.map((coordinates: L.LatLng) => {
        render.push(
          manageLeafletItems.newMarkerWithIcon(
            coordinates.lat,
            coordinates.lng,
            icon
          )
        );
      });
    });
    return render;
  }

  formatTrackLabel = (track: gongleaflet.VisualTrackDB): string => {
    let label: string = track.Name;
    if (track.DisplayLevelAndSpeed) {
      label += `</br>
      ${track.Level.toFixed(0)} - ${track.Speed.toFixed(0)}</br>`;
    }
    return label;
  };
}

const LIMIT_HISTORY_LENGTH = 10;

const addNewCoordToFIFO = (
  list: Array<L.LatLng>,
  newItem: L.LatLng
): Array<L.LatLng> => {
  let tmpList = list;
  if (tmpList.length >= LIMIT_HISTORY_LENGTH) {
    tmpList.shift();
  }
  tmpList.push(newItem);
  return tmpList;
};

