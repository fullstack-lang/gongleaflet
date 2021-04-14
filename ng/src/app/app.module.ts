import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { GongleafletModule } from 'gongleaflet'
import { GongleafletspecificModule } from 'gongleafletspecific'

// mandatory
import { HttpClientModule } from '@angular/common/http';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { AngularSplitModule } from 'angular-split';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,

    MatRadioModule,
    FormsModule,

    AngularSplitModule,

    GongleafletModule,
    GongleafletspecificModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
