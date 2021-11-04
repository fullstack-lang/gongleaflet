import { Component, OnInit } from '@angular/core';
import * as gongleaflet from 'gongleaflet';

import * as L from 'leaflet';

import * as manageLeafletItems from '../manage-leaflet-items';

@Component({
  selector: 'app-cartoatc-circles',
  templateUrl: './cartoatc-circles.component.html',
  styleUrls: ['./cartoatc-circles.component.scss']
})
export class CartoatcCirclesComponent implements OnInit {
  render: Array<L.Layer> = [];

  constructor(
    private circleService: gongleaflet.CircleService,
  ) { }

  ngOnInit(): void {
    this.circleService.getCircles().subscribe(
      (circles) => {
        circles.forEach(circle => {
          this.render.push(manageLeafletItems.newCircle(circle));
        })
      }
    );
  }
}
