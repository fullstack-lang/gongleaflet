import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LayerGroupService } from 'gongleaflet';
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

  layerGroups: gongleaflet.LayerGroupDB[] = []
  list: Array<LayerItem> = [];
  open: boolean = false;

  constructor(private layerGroupService: LayerGroupService) { }

  ngOnInit(): void {
    this.layerGroupService.getLayerGroups().subscribe(
      layerGroups => {
        this.layerGroups = layerGroups

        for (let layerGroup of this.layerGroups) {
          let layerItem = new LayerItem
          layerItem.id = layerGroup.ID
          layerItem.name = layerGroup.Name
          layerItem.display = layerGroup.DisplayName || layerGroup.Name
          layerItem.status = true

          this.list.push(layerItem);
        }
      }
    )
  }

  toggleOpen() {
    this.open = !this.open;
  }

  handleChange(change: MatSlideToggleChange, id: number) {

    console.log("Toggling layer " + id)



    let layerItems = document.getElementsByClassName('layer-' + id);
    for (let index = 0; index < layerItems.length; index++) {
      let htmlElement: Element | any = layerItems[index];
      setVisibilityHTMLElement(htmlElement, change.checked);
    }
  }
}
