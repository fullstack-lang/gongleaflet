import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { setVisibilityHTMLElement } from '../manage-leaflet-items';

import * as gongleaflet from '../../../../../gongleaflet/src/public-api'

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

class LayerItem {
  id: number = 0
  name: string = ""
  display: string = ""
  status: boolean = false
}

// https://stackoverflow.com/questions/54734329/ngx-leaflet-how-to-add-a-custom-control
@Component({
    selector: 'app-cartoatc-control-settings',
    templateUrl: './cartoatc-control-settings.component.html',
    styleUrls: ['./cartoatc-control-settings.component.scss'],
    imports: [
        MatButtonModule,
        MatSlideToggleModule,
        MatIconModule,
        CommonModule,
    ]
})
export class CartoatcControlSettingsComponent implements OnInit {

  // mapMap
  @Input() mapName!: string

  @Input() GONG__StackPath: string = ""

  // the gong front repo
  frontRepo?: gongleaflet.FrontRepo
  gongleafletMapOptions?: gongleaflet.MapOptions

  list: Array<LayerItem> = [];
  open: boolean = false;

  // map between the layerGroup ID and the LayerGroupUse
  // this is used to toggle the Display field of LayerGroupUse
  mapLayerGroupID_gongLayerGroupUse = new Map<number, gongleaflet.LayerGroupUse>()

  constructor(
    private frontRepoService: gongleaflet.FrontRepoService,
    private layerGroupUseService: gongleaflet.LayerGroupUseService) {
  }

  ngOnInit(): void {

    this.frontRepoService.pull(this.GONG__StackPath).subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        let gongleafletMapOptions = Array.from(this.frontRepo.getFrontArray<gongleaflet.MapOptions>(gongleaflet.MapOptions.GONGSTRUCT_NAME).values())[0]
        this.gongleafletMapOptions = gongleafletMapOptions

        // if the map name is set, then map options might differ
        if (this.mapName != "") {
          for (let gongleafletMapOptions of this.frontRepo.getFrontArray<gongleaflet.MapOptions>(gongleaflet.MapOptions.GONGSTRUCT_NAME).values()) {
            if (gongleafletMapOptions.Name == this.mapName) {
              this.gongleafletMapOptions = gongleafletMapOptions
            }
          }
        }

        // prepare entries for the mat-slide-toggle
        if (this.gongleafletMapOptions.LayerGroupUses) {
          for (let gongLayerGroupUse of this.gongleafletMapOptions.LayerGroupUses) {
            let gongLayerGroup = gongLayerGroupUse.LayerGroup
            if (gongLayerGroup) {
              let layerItem = new LayerItem
              layerItem.id = gongLayerGroup.ID
              layerItem.name = gongLayerGroup.Name
              layerItem.display = gongLayerGroup.DisplayName || gongLayerGroup.Name
              layerItem.status = gongLayerGroupUse.IsDisplayed

              this.list.push(layerItem)

              this.mapLayerGroupID_gongLayerGroupUse.set(gongLayerGroup.ID, gongLayerGroupUse)
            }
          }
        }
      }
    )
  }

  toggleOpen() {
    this.open = !this.open;
  }

  handleChange(change: MatSlideToggleChange, id: number) {

    console.log("Toggling layer " + id)

    let layerGroupUse = this.mapLayerGroupID_gongLayerGroupUse.get(id)
    if (layerGroupUse) {
      layerGroupUse.IsDisplayed = !layerGroupUse.IsDisplayed

      this.layerGroupUseService.updateFront(layerGroupUse, this.GONG__StackPath).subscribe(
        () => {
          console.log("layer group use " + layerGroupUse?.Name + " display value updated to " + layerGroupUse?.IsDisplayed)

          this.layerGroupUseService.LayerGroupUseServiceChanged.next("update")
        }
      )
    }
  }
}
