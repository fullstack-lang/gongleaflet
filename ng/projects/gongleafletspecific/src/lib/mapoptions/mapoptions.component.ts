import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, timer, Observable } from 'rxjs';

import * as L from 'leaflet';
import 'leaflet-rotatedmarker';

import * as gongleaflet from 'gongleaflet';
import * as manageLeafletItems from './manage-leaflet-items';
import { dotBlur } from '../../assets/icons/dot_blur';
import { refreshMapWithMarkers } from './refreshMapWithMarkers'

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

  // 1. name of the initial map
  // 2. the corresponding gong MapOptions object
  // 3. the corresponding [leafletOptions]="mapOptions" that is passed to the leaflet map in the html
  @Input() mapName: string = ""
  gongleafletMapOptions?: gongleaflet.MapOptionsDB
  mapOptions?: L.MapOptions // stangely, impossible to type without ?

  // [leafletLayers]="rootOfLayerGroups" that is passed to one div in the html
  rootOfLayerGroups: L.Layer[] = [];

  //
  // Visual Track stuff
  //

  // idem for [leafletLayers]="visualTracksHistory"
  visualTracksHistory: L.Layer[] = [];

  // map of visualTrack ID to visualTrackMarker in order to perform updates
  mapVisualTrackID_VisualMarker = new Map<number, L.Marker>();

  // map of visualTrackMarker to visualTrack ID in order to delete deleted visualTrack
  mapVisualMarker_VisualTrackID = new Map<L.Marker, number>();

  // mapVisualTrackName_positionsHistory stores tracks histories
  mapVisualTrackName_positionsHistory: Map<string, Array<L.LatLng>> = new Map();

  //
  // Other objets
  //
  // map that store leaflet object according to the gong object ID
  mapGongLayerGroupID_LeafletLayerGroup = new Map<number, L.LayerGroup<L.Layer>>()
  mapVLineID_LeafletPolyline = new Map<number, L.Polyline>()
  mapMarkerID_LeafletMarker = new Map<number, L.Marker>()
  map_divIconID_divIconSVG = new Map<number, string>()

  // // map that stores which 
  // mapGongLayerGroupUseID_GongLayerGroupID = new Map<number, number>()

  // map that allows direct access from the Gong LayerGroupID to the LayerGroupUse of the map
  // if a gong layerGroup is present, it means the layer is is to be displayed on this map
  mapGongLayerGroupID_LayerGroupUse = new Map<number, gongleaflet.LayerGroupUseDB>()

  // the gong front repo
  frontRepo?: gongleaflet.FrontRepo

  // autonmatic refresh of maps
  obsTimer: Observable<number> = timer(1000, 500) // due time 1', period 0.5'

  constructor(
    public frontRepoService: gongleaflet.FrontRepoService,
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

        refreshMapWithMarkers(this)

        // // parse all layerGroupUse of the current mapOptions
        // // create a leaflet LayerGroup for each
        // if (this.gongleafletMapOptions?.LayerGroupUses) {
        //   for (let gongLayerGroupUse of this.gongleafletMapOptions.LayerGroupUses) {
        //     let gongLayerGroup = gongLayerGroupUse.LayerGroup

        //     if (gongLayerGroup) {
        //       let leafletLayerGroup = L.layerGroup()
        //       this.rootOfLayerGroups.push(leafletLayerGroup)
        //       this.mapGongLayerGroupID_LeafletLayerGroup.set(gongLayerGroup.ID, leafletLayerGroup)
        //       this.mapGongLayerGroupID_LayerGroupUse.set( gongLayerGroup.ID, gongLayerGroupUse)
        //     }
        //   }
        // }

        // display circles
        for (let circle of this.frontRepo.Circles_array) {

          // get layer of the circle
          let gongLayerGroup = circle.LayerGroup
          if (gongLayerGroup) {
            // is this layer present in the current map ?
            let leafletLayerGroup = this.mapGongLayerGroupID_LeafletLayerGroup.get(gongLayerGroup.ID)

            if (leafletLayerGroup) {
              let leafletCircle = manageLeafletItems.newCircle(circle)
              leafletCircle?.addTo(leafletLayerGroup)
            }
          }
        }


        this.lineService.VLineServiceChanged.subscribe(
          message => {
            if (message == "post" || message == "update" || message == "delete") {
              // update line positions
              for (let gongVLine of this.frontRepo?.VLines_array!) {

                var leafletPolyline = this.mapVLineID_LeafletPolyline.get(gongVLine.ID)

                //
                // if lealet has no sister element of the VLine, then create one
                //
                if (!leafletPolyline) {
                  // get layer of the circle
                  let gongLayerGroup = gongVLine.LayerGroup
                  if (gongLayerGroup) {
                    // is this layer present in the current map ?
                    let leafletLayerGroup = this.mapGongLayerGroupID_LeafletLayerGroup.get(gongLayerGroup.ID)

                    if (leafletLayerGroup) {

                      leafletPolyline = new L.Polyline([]);
                      leafletPolyline = manageLeafletItems.setLine(gongVLine);

                      leafletPolyline.addTo(leafletLayerGroup)
                      this.mapVLineID_LeafletPolyline.set(gongVLine.ID, leafletPolyline);
                    }
                  }
                }

                if (leafletPolyline) {
                  // update position
                  leafletPolyline.setLatLngs([
                    [gongVLine.StartLat, gongVLine.StartLng],
                    [gongVLine.EndLat, gongVLine.EndLng],
                  ]);
                  leafletPolyline.options.color = manageLeafletItems.getColor(
                    gongVLine.ColorEnum
                  );
                  leafletPolyline.setStyle(leafletPolyline.options);
                }
              }
            }
          })
      })

    this.lineService.VLineServiceChanged.next('post')
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

    this.markerService.MarkerServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          refreshMapWithMarkers(this)
        }
      }
    )
    this.layerGroupUseService.LayerGroupUseServiceChanged.subscribe(
      message => {
        if (message == "post" || message == "update" || message == "delete") {
          refreshMapWithMarkers(this)
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
      'layer-',
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

export const LIMIT_HISTORY_LENGTH = 10;

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

