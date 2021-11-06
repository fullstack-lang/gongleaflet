import { Component, Input, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { combineLatest, timer, Observable } from 'rxjs'

import * as L from 'leaflet'
import 'leaflet-rotatedmarker'

import * as gongleaflet from 'gongleaflet';
import * as manageLeafletItems from './manage-leaflet-items'
import { dotBlur } from '../../assets/icons/dot_blur'

export const DEFAULT_ICON_SIZE = 60

// MapoptionsComponent is an ngx-asymterix angular component (itself based in leaflet) that is
// - the component that displays all layers
// A gong stack can handle multiple Mapoptions and therefore display more than one map.
@Component({
  selector: 'app-mapoptions',
  templateUrl: './mapoptions.component.html',
  styleUrls: ['./mapoptions.component.scss'],
})
export class MapoptionsComponent implements OnInit {

  // 1. name of the initial map (must match the name in the backend)
  // 2. the corresponding gong MapOptions object
  // 3. the corresponding [leafletOptions]="mapOptions" that is passed to the leaflet map in the html
  @Input() mapName: string = ""
  mapOptionsID: number = 0
  leafletMapOptions?: L.MapOptions // stangely, impossible to type without ?

  // [leafletLayers]="rootOfLayerGroups" that is passed to one div in the html, ngx-asymetrix
  // https://github.com/Asymmetrik/ngx-leaflet#add-custom-layers-base-layers-markers-shapes-etc
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

  // for debug purpose
  leafletMap?: L.Map

  currTime: number = 0

  // commitNb stores the number of commit on the backend
  commitNb: number = 0

  constructor(
    public frontRepoService: gongleaflet.FrontRepoService,
    private visualTrackService: gongleaflet.VisualTrackService,
    private lineService: gongleaflet.VLineService,
    private markerService: gongleaflet.MarkerService,
    private layerGroupUseService: gongleaflet.LayerGroupUseService,
    private commitNbService: gongleaflet.CommitNbService,
    private router: Router,
    public zone: NgZone
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  // not yet clear what those lines mean
  // anyway, the is a paramter in ngx-asymetrix
  // https://github.com/Asymmetrik/ngx-leaflet#leafletmapready-map
  onMapReady(leafletMap: L.Map) {

    this.leafletMap = leafletMap

    setTimeout(() => {
      leafletMap.invalidateSize();
    }, 0);
  }

  ngOnInit(): void {

    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        let gongMapOptions = Array.from(this.frontRepo.MapOptionss.values())[0]

        // if the map name is set, then map options might differ
        if (this.mapName != "") {
          for (let gongleafletMapOptions of this.frontRepo.MapOptionss.values()) {
            if (gongleafletMapOptions.Name == this.mapName) {
              this.mapOptionsID = gongleafletMapOptions.ID
              gongMapOptions = gongleafletMapOptions
            }
          }
        }

        // set the map options that will set up the angular component
        this.leafletMapOptions = manageLeafletItems.visualMapToLeafletMapOptions(gongMapOptions)

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
        // update visual line when the data has changed
        // observable for changes in structs
        this.visualTrackService.VisualTrackServiceChanged.subscribe((message) => {
          if (message == 'post' || message == 'update' || message == 'delete') {
            this.refreshMapWithMarkers()
          }
        })

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

        this.refreshMapWithMarkers()

        //
        // timer to refresh the map if something has changed in the back
        this.obsTimer.subscribe(
          () => {
            this.commitNbService.getCommitNb().subscribe(
              commitNb => {
                // console.log("commit nb in the back " + commitNb + " local commit nb " + this.commitNb)
                if (commitNb > this.commitNb) {
                  this.refreshMapWithMarkers()
                  this.commitNb = commitNb
                }
              }
            )
          }
        )
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
      var leafletTrackMarker = manageLeafletItems.newMarkerWithIcon(
        visualTrack.Lat,
        visualTrack.Lng,
        icon
      );

      {
        // @ts-ignore: Unreachable code error
        leafletTrackMarker.setRotationOrigin('center center');
      }

      manageLeafletItems.rotateIcon(
        visualTrack.ID + '-track',
        visualTrack.Heading
      );

      this.mapVisualTrackID_VisualMarker.set(visualTrack.ID, leafletTrackMarker);
      this.mapVisualMarker_VisualTrackID.set(leafletTrackMarker, visualTrack.ID);

      // get layer of visual track
      let gongLayerGroup = visualTrack.LayerGroup
      if (gongLayerGroup) {
        let leafletLayer = this.mapGongLayerGroupID_LeafletLayerGroup.get(gongLayerGroup.ID)

        if (leafletLayer) {
          leafletTrackMarker.addTo(leafletLayer)
        }
      }

      //      this.rootOfLayerGroups.push(leafletTrackMarker);
    }
  }

  manageUpdateVisualTrackMarker(
    visualTrack: gongleaflet.VisualTrackDB,
    marker: L.Marker<any>
  ) {
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


  refreshMapWithMarkers() {

    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        // Management of layers.
        //
        // 1. get all layerGroupUse by the mapOption and store them in the map "mapGongLayerGroupID_LayerGroup"
        // of layers that have to be displayed
        // If the LayerGroupID is in not in the layer group and to be displayed, add it to the root of LayersGroup
        // If not, remove it from the root of LayersGroup if it is present

        // reset the map of layers that have to be displayed on this map
        this.mapGongLayerGroupID_LayerGroupUse.clear()

        // populate the map with information from layerGroupUse of this map
        let gongleafletMapOptions = this.frontRepo.MapOptionss.get(this.mapOptionsID)
        for (let gongLayerGroupUse of gongleafletMapOptions?.LayerGroupUses!) {
          let gongLayerGroup = gongLayerGroupUse.LayerGroup
          if (gongLayerGroup) {
            this.mapGongLayerGroupID_LayerGroupUse.set(gongLayerGroup.ID, gongLayerGroupUse)

            // if not present, create a leaflet layer group and add it to the root
            let leafletLayerGroup = this.mapGongLayerGroupID_LeafletLayerGroup.get(gongLayerGroup.ID)
            if (!leafletLayerGroup) {
              leafletLayerGroup = new L.LayerGroup<L.Marker>()
              this.mapGongLayerGroupID_LeafletLayerGroup.set(gongLayerGroup.ID, leafletLayerGroup)
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
            let layerAlreadyDisplayed = this.rootOfLayerGroups.find(present => present == leafletLayerGroup)

            let hasToBeRemoved: boolean = false
            let hasToBeAdded: boolean = false

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
              // console.log("map " + this.mapName + " has to add layer group named " + gongLayerGroup.Name)
              this.rootOfLayerGroups.push(leafletLayerGroup)
            }

            if (hasToBeRemoved) {
              // console.log("map " + this.mapName + " has to remove layer group named " + gongLayerGroup.Name)
              this.rootOfLayerGroups.forEach((element, index) => {
                if (element == layerAlreadyDisplayed) this.rootOfLayerGroups.splice(index, 1);
              });
            }
          }
        }

        // pair gong divIcon with leaflet divIcon
        for (let divIcon of this.frontRepo.DivIcons_array) {
          if (!this.map_divIconID_divIconSVG.has(divIcon.ID)) {
            this.map_divIconID_divIconSVG.set(divIcon.ID, divIcon.SVG);
          }
        }

        //
        // parse all markers
        //
        for (let gongMarker of this.frontRepo.Markers_array) {

          // get the leaflet kin of the gong Marker
          let leafletMarker: L.Marker | undefined
          leafletMarker = this.mapMarkerID_LeafletMarker.get(gongMarker.ID)

          // if absent, create the kin
          if (!leafletMarker) {
            // console.log("Gong Marker " + gongMarker.Name + " has no leaflet kin")
            var color = manageLeafletItems.getColor(gongMarker.ColorEnum);

            var icon: L.DivIcon = manageLeafletItems.newIcon(
              gongMarker.ID,
              'layer-' + gongMarker.LayerGroupID.Int64,
              this.map_divIconID_divIconSVG.get(gongMarker.DivIconID.Int64)!,
              DEFAULT_ICON_SIZE,
              color,
              gongMarker.Name
            );

            // creation
            leafletMarker = manageLeafletItems.newMarkerWithIcon(
              gongMarker.Lat,
              gongMarker.Lng,
              icon
            )

            // get the leallet layerGroup of the marker
            let leafletLayerGroup: L.LayerGroup<L.Layer> | undefined
            let markerLayerGroup = gongMarker.LayerGroup
            if (markerLayerGroup) {
              leafletLayerGroup = this.mapGongLayerGroupID_LeafletLayerGroup.get(markerLayerGroup.ID)
              if (leafletLayerGroup) {
                leafletMarker.addTo(leafletLayerGroup)
              }
            }

            // add the kin to the map
            this.mapMarkerID_LeafletMarker.set(gongMarker.ID, leafletMarker)
          } else {
            // console.log("Gong Marker " + gongMarker.Name + " has already a leaflet kin")
          }
        }

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

            // remove markers that have no visual tracks
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
        // console.log("Map : " + this.mapName + ", length of root of leaflet layers: " + this.rootOfLayerGroups.length)
      }
    )
  }
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

