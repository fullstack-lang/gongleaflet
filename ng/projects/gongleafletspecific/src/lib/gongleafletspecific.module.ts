import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';

import { GongleafletspecificComponent } from './gongleafletspecific.component';

import { MapoptionsComponent } from './mapoptions/mapoptions.component';
// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarkersComponent } from './mapoptions/markers/markers.component';
import { CartoatcLinesComponent } from './mapoptions/cartoatc-lines/cartoatc-lines.component';
import { CartoatcControlSettingsComponent } from './mapoptions/cartoatc-control-settings/cartoatc-control-settings.component';
import { CartoatcCirclesComponent } from './mapoptions/cartoatc-circles/cartoatc-circles.component';
// Material UI
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GongleafletspecificComponent,

    MapoptionsComponent,
    MarkersComponent,
    CartoatcLinesComponent,
    CartoatcControlSettingsComponent,
    CartoatcCirclesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    LeafletModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  exports: [
    GongleafletspecificComponent,

    MapoptionsComponent,
    MarkersComponent,
    CartoatcLinesComponent,
    CartoatcControlSettingsComponent,
    CartoatcCirclesComponent,
  ],
})
export class GongleafletspecificModule { }
