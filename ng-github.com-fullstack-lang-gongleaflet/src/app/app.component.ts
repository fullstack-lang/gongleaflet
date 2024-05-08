import { Component, OnInit } from '@angular/core';

import { Observable, combineLatest, timer } from 'rxjs'

import * as gongdoc from 'gongdoc'
import * as gongleaflet from 'gongleaflet'

import { GongdocModule } from 'gongdoc'
import { GongdocspecificModule } from 'gongdocspecific'

import { GongtreeModule } from 'gongtree'
import { GongtreespecificModule } from 'gongtreespecific'

import { GongtableModule } from 'gongtable'
import { GongtablespecificModule } from 'gongtablespecific'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  default = 'Gongleaflet Data/Model'
  carto = 'Carto view'
  view = this.carto

  views: string[] = [this.carto, this.default];

  scrollStyle = {
    'overflow- x': 'auto',
    'width': '100%',  // Ensure the div takes the full width of its parent container
  }

  StackName = "gongleaflet"
  StackType = "github.com/fullstack-lang/gongleaflet/go/models"
  loading: boolean = true

  userClick(lat: number, lng: number): void {
    console.log("user clicked on lat: " + lat + " lng: " + lng)
  }

  ngOnInit(): void {
  }
}
