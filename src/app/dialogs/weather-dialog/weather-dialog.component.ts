import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WeatherServiceService } from 'src/services/weather-service.service';


@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.css']
})
export class WeatherDialogComponent implements OnInit {

  cornerVal:any;
  foreCastOn = false;
  currentResults:any;

  constructor(public dialogRef: MatDialogRef<WeatherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private forecastService : WeatherServiceService) { }

  ngOnInit(): void {
  }

  showForecast(showMode:boolean)
  {
    if(showMode && (this.cornerVal != undefined || this.cornerVal != ""))
    {
      this.forecastService.getWeatherByCity(this.cornerVal.city).subscribe(result => {
        if (result)
        {
          this.foreCastOn = true;
          this.currentResults = JSON.parse(JSON.stringify(result)).list
          // console.log(this.currentResults);
        }
      },
      error => {
        alert(error.message);
      });
    }
    else
      this.dialogRef.close(false)
  }

}
