import { Component, OnInit } from '@angular/core';

import { Observable, combineLatest, timer } from 'rxjs'

import * as gongdoc from 'gongdoc'
import * as gongleaflet from 'gongleaflet'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {

  default = 'Gongleaflet Data/Model'
  carto = 'carto view'
  view = this.carto

  views: string[] = [this.default];

  GONG__StackPath = "github.com/fullstack-lang/gongleaflet/go/models"
  loading: boolean = true

  userClick(lat: number, lng: number): void {
    console.log("user clicked on lat: " + lat + " lng: " + lng)
  }

  ngOnInit(): void {
    this.loading = false
  }
}
