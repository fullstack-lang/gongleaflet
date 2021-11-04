import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { setVisibilityHTMLElement } from '../manage-leaflet-items';

import * as gongleaflet from 'gongleaflet'

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
})
export class CartoatcControlSettingsComponent implements OnInit {

  // mapMap
  @Input() mapName!: string

  // the gong front repo
  frontRepo?: gongleaflet.FrontRepo
  gongleafletMapOptions?: gongleaflet.MapOptionsDB

  list: Array<LayerItem> = [];
  open: boolean = false;

  // map between the layerGroup ID and the LayerGroupUse
  mapLayerGroupID_LayerItem = new Map<number, gongleaflet.LayerGroupUseDB>()

  constructor(
    private frontRepoService: gongleaflet.FrontRepoService,
    private layerGroupUseService: gongleaflet.LayerGroupUseService) {

  }

  ngOnInit(): void {

    this.frontRepoService.pull().subscribe(
      frontRepo => {
        this.frontRepo = frontRepo

        let gongleafletMapOptions = Array.from(this.frontRepo.MapOptionss.values())[0]
        this.gongleafletMapOptions = gongleafletMapOptions

        // if the map name is set, then map options might differ
        if (this.mapName != "") {
          for (let gongleafletMapOptions of this.frontRepo.MapOptionss.values()) {
            if (gongleafletMapOptions.Name == this.mapName) {
              this.gongleafletMapOptions = gongleafletMapOptions
            }
          }
        }

        if (this.gongleafletMapOptions.LayerGroupUses) {
          for (let layerGroupUse of this.gongleafletMapOptions.LayerGroupUses) {
            let layerGroup = layerGroupUse.LayerGroup
            if (layerGroup) {
              let layerItem = new LayerItem
              layerItem.id = layerGroup.ID
              layerItem.name = layerGroup.Name
              layerItem.display = layerGroup.DisplayName || layerGroup.Name
              layerItem.status = layerGroupUse.Display

              this.list.push(layerItem)

              this.mapLayerGroupID_LayerItem.set(layerGroup.ID, layerGroupUse)
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

    let layerGroupUse = this.mapLayerGroupID_LayerItem.get(id)
    if (layerGroupUse) {
      layerGroupUse.Display = !layerGroupUse.Display

      this.layerGroupUseService.updateLayerGroupUse(layerGroupUse).subscribe(
        (value) => {
          console.log("layer group use updated")
          this.layerGroupUseService.LayerGroupUseServiceChanged.next("update")
        }
      )
    }

    let layerItems = document.getElementsByClassName('layer-' + id);
    for (let index = 0; index < layerItems.length; index++) {
      let htmlElement: Element | any = layerItems[index];
      setVisibilityHTMLElement(htmlElement, change.checked);
    }
  }
}
