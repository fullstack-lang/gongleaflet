import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, timer, Observable } from 'rxjs';

import * as L from 'leaflet';
import 'leaflet-rotatedmarker';

import * as gongleaflet from 'gongleaflet';

import * as manageLeafletItems from './manage-leaflet-items';

import { dotBlur } from '../../assets/icons/dot_blur';

export const DEFAULT_ICON_SIZE = 60

// MapoptionsComponent is an angular component that is
// - the component that displays tracks
// - the root component of other components that display other elements (centers, lines, ...)
@Component({
  selector: 'app-mapoptions',
  templateUrl: './mapoptions.component.html',
  styleUrls: ['./mapoptions.component.scss'],
})
export class MapoptionsComponent implements OnInit {

  // list of initial layers
  @Input() initialLayers!: string

  // name of the initial map
  @Input() mapName: string = ""
  gongleafletMapOptions?: gongleaflet.MapOptionsDB

  // current map
  currentMap?: L.Map

  // [leafletOptions]="mapOptions" is passed to the leaflet map in the html
  mapOptions?: L.MapOptions // stangely, impossible to type without ?

  // [leafletLayers]="rootOfLayerGroups" is passed to one div in the html
  rootOfLayerGroups: L.Layer[] = [];

  // map between a gong layerGroup ID and a leaflet L.LayerGroup
  mapGongLayerGroupID_LayerGroup = new Map<number, L.Layer>();

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


  // map that store leaflet polylines according to the gong line
  mapVLineID_LeafletPolyline = new Map<number, L.Polyline>();


  // store relation between the Markers & the markers
  mapMarkerID_LeafletMarker = new Map<number, L.Marker>();

  // map that stores relation between the div icon ID and the svg content 
  map_divIconID_divIconSVG = new Map<number, string>();

  // the gong front repo
  frontRepo?: gongleaflet.FrontRepo

  constructor(
    private frontRepoService: gongleaflet.FrontRepoService,
    private visualTrackService: gongleaflet.VisualTrackService,
    private lineService: gongleaflet.VLineService,
    private markerService: gongleaflet.MarkerService,
    private layerGroupUseService: gongleaflet.LayerGroupUseService,
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

    // this.currentMap = L.map('atcmapid')

    console.log("layers name " + this.initialLayers)

    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        let gongMapOptions = Array.from(this.frontRepo.MapOptionss.values())[0]

        // if the map name is set, then map options might differ
        if (this.mapName != "") {
          for (let gongleafletMapOptions of this.frontRepo.MapOptionss.values()) {
            if (gongleafletMapOptions.Name == this.mapName) {
              this.gongleafletMapOptions = gongleafletMapOptions
              gongMapOptions = gongleafletMapOptions
            }
          }
        }

        this.mapOptions = manageLeafletItems.visualMapToLeafletMapOptions(gongMapOptions)

        // display circles
        for (let circle of this.frontRepo.Circles_array) {
          let leafletCircle = manageLeafletItems.newCircle(circle)
          this.rootOfLayerGroups.push(leafletCircle)
        }

        // display vlines
        for (let line of this.frontRepo.VLines_array) {
          var polyline: L.Polyline = new L.Polyline([]);
          polyline = manageLeafletItems.setLine(line);

          this.rootOfLayerGroups.push(polyline);
          this.mapVLineID_LeafletPolyline.set(line.ID, polyline);
        }

        this.lineService.VLineServiceChanged.subscribe(
          message => {
            if (message == "post" || message == "update" || message == "delete") {
              // update line positions
              this.lineService.getVLines().subscribe((lines) => {
                lines.forEach((line) => {
                  var visualLineMarker = this.mapVLineID_LeafletPolyline.get(
                    line.ID
                  );

                  if (visualLineMarker) {
                    // update position
                    visualLineMarker.setLatLngs([
                      [line.StartLat, line.StartLng],
                      [line.EndLat, line.EndLng],
                    ]);
                    visualLineMarker.options.color = manageLeafletItems.getColor(
                      line.ColorEnum
                    );
                    visualLineMarker.setStyle(visualLineMarker.options);
                  }
                });
              });
            }
          })
      })

    this.visualTrackService.VisualTrackServiceChanged.next('update');

    // update visual line when the data has changed
    // observable for changes in structs
    this.visualTrackService.VisualTrackServiceChanged.subscribe((message) => {
      if (message == 'post' || message == 'update' || message == 'delete') {

        // update track position by using the front repo
        this.frontRepoService.VisualTrackPull().subscribe(
          frontRepo => {

            this.frontRepo = frontRepo

            // get all LayerGroups and add them to the "layerGroup"
            for (let gongLayerGroup of this.frontRepo.LayerGroups_array) {
              let leafletLayerGroup = L.layerGroup()
              this.rootOfLayerGroups.push(leafletLayerGroup)
              this.mapGongLayerGroupID_LayerGroup.set(gongLayerGroup.ID, leafletLayerGroup)
            }

            // update marker from visual track
            for (let vTrack of frontRepo.VisualTracks_array) {
              let _currentMarker: L.Marker<any> = this.mapVisualTrackID_VisualMarker.get(vTrack.ID)!
              if (!_currentMarker) {
                this.manageNewVisualTrackMarker(vTrack);
              } else {
                this.manageUpdateVisualTrackMarker(vTrack, _currentMarker);
              }
            }

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
            })
          })
      }
    })

    
    this.refreshMapWithMarkers()

    this.markerService.MarkerServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refreshMapWithMarkers()
        }
      }
    )
    this.layerGroupUseService.LayerGroupUseServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          this.refreshMapWithMarkers()
        }
      }
    )
  }

  // manageNewVisualTrackMarker takes a visualTrack and 
  // add a L.DivIcon to the 
  manageNewVisualTrackMarker(visualTrack: gongleaflet.VisualTrackDB) {
    var color = manageLeafletItems.getColor(visualTrack.ColorEnum);

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
      this.rootOfLayerGroups.push(marker);
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

  refreshMapWithMarkers() {
    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        // get layers of the map
        // get all gong LayerGroups, and add them to the "layerGroup"
        for (let gongLayerGroup of this.frontRepo.LayerGroups_array) {

          // if not present, create a leaflet layer group and add it to the root
          let leafletLayerGroup = this.mapGongLayerGroupID_LayerGroup.get(gongLayerGroup.ID)
          if (!leafletLayerGroup) {
            leafletLayerGroup = new L.LayerGroup<L.Marker>()
            this.rootOfLayerGroups.push(leafletLayerGroup)
            this.mapGongLayerGroupID_LayerGroup.set(gongLayerGroup.ID, leafletLayerGroup)
          }
        }

        this.frontRepo.DivIcons.forEach((divIcon) => {
          if (!this.map_divIconID_divIconSVG.has(divIcon.ID)) {
            this.map_divIconID_divIconSVG.set(divIcon.ID, divIcon.SVG);
          }
        });

        this.frontRepo.Markers.forEach((marker) => {

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
                this.rootOfLayerGroups.push(leafletMarker)
              }
            }

            this.mapMarkerID_LeafletMarker.set(marker.ID, leafletMarker)
          }
        })
      }
    )
  }
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

