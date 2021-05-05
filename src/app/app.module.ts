import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SlabCallendarComponent } from './slab-callendar/slab-callendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { HoverClassDirective } from "./directives/app.hoverClassDirective";

import { MaterialModule } from "src/material/material.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddReminderDialogComponent } from './dialogs/add-reminder-dialog/add-reminder-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { WeatherServiceService } from "../services/weather-service.service";
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { WeatherDialogComponent } from './dialogs/weather-dialog/weather-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SlabCallendarComponent,
    HoverClassDirective,
    AddReminderDialogComponent,
    DeleteDialogComponent,
    WeatherDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    ColorPickerModule,
    HttpClientModule
  ],
  entryComponents:[AddReminderDialogComponent, DeleteDialogComponent, WeatherDialogComponent],
  providers:[WeatherServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
