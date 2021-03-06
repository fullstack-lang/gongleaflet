import { Component } from '@angular/core';

import * as gongleafletspecific from 'gongleafletspecific'
import * as gongleaflet from 'gongleaflet'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng';

  view = 'Carto view' // the curent view
  carto = 'Carto view'
  data = 'Data view'
  diagrams = 'Diagrams view'
  views: string[] = [this.carto, this.data];

  userClick(lat: number, lng: number): void {
    console.log("user clicked on lat: " + lat + " lng: " + lng)
  }
}
