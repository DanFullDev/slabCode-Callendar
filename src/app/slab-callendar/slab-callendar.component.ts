import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { monthStruct } from "src/interfaces/month-struct";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddReminderDialogComponent } from '../dialogs/add-reminder-dialog/add-reminder-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { WeatherServiceService } from 'src/services/weather-service.service';
import { element } from 'protractor';
import { WeatherDialogComponent } from '../dialogs/weather-dialog/weather-dialog.component';

@Component({
  selector: 'app-slab-callendar',
  templateUrl: './slab-callendar.component.html',
  styleUrls: ['./slab-callendar.component.css']
})
export class SlabCallendarComponent implements OnInit {

  //Variable initialisation

  // The array that will store interface typed month objects to allow
  // swicth between months
  callendarObj: monthStruct[] = [];

  currentMonthObj:any;

  currentMonth: number = 0;
  currentYear: number = 0;

  daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  monthsOfTheYear: any;
  //Constructor function where we initialize our weather API
  constructor(public dialogOpen: MatDialog, private forecastService : WeatherServiceService) { }

  ngOnInit(): void
  {
    this.monthsOfTheYear = moment.months();
    this.initialiseCalendarData();
  }

  initialiseCalendarData()
  {
    let localVal:any = localStorage.getItem('calendarData')
    let structVal:any = localStorage.getItem('calendarStructure')
    if(localVal)
    {
      this.currentYear = JSON.parse(localVal).Year;
      this.currentMonth = JSON.parse(localVal).Month;
      this.currentMonthObj = JSON.parse(localVal);
    }
    else
    {
      let currentDateArray = moment().toArray();
      this.currentYear = currentDateArray[0];
      this.currentMonth = currentDateArray[1] + 1;
      let tempMonthObj = {
        Month: this.currentMonth,
        Year: this.currentYear,
        dayData: this.fillDayData()
      };
      this.currentMonthObj = tempMonthObj;
    }
    if(structVal)
      this.callendarObj = JSON.parse(structVal);
    else
      this.callendarObj.push(this.currentMonthObj);
  }

  fillDayData()
  {

    let daysInMonth = moment(this.currentYear + "-" + (this.currentMonth < 10 ? "0" + (this.currentMonth) : this.currentMonth),"YYYY-MM").daysInMonth();
    let daysOfPrevMont = 0
    if(this.currentMonth-1 < 10 && this.currentMonth-1 > 0)
     daysOfPrevMont = moment(this.currentYear + "-" + (this.currentMonth-1 < 10 ? "0" + (this.currentMonth-1) : this.currentMonth-1),"YYYY-MM").daysInMonth();
    else if(this.currentMonth-1 <= 0)
      daysOfPrevMont = moment(this.currentYear + "-12","YYYY-MM").daysInMonth();
    else
      daysOfPrevMont = moment(this.currentYear + "-" + this.currentMonth,"YYYY-MM").daysInMonth();

    let tempArray = [];
    let addIndex = 0;
    let prevIndex = 2;

    if(daysInMonth == 31)
      addIndex = 1
    else if( daysInMonth == 30)
      addIndex = 2;
    else if(daysInMonth == 28)
      addIndex = 4
      else if(daysInMonth == 29)
      addIndex = 3

    for (let index = prevIndex; index > 0; index--)
    {
      let tempObj = {
        dayIndex: daysOfPrevMont-(index-1),
        data:{
          reminder: []
        },
        isInsideMonth: false
      }
      tempArray.push(tempObj);
    }

    for (let index = 0; index <=daysInMonth+addIndex; index++) {
      let tempObj = {
         dayIndex: index <= daysInMonth-1 ? index+1 : (index+1) - (daysInMonth),
         data:{
           reminder: []
         },
         isInsideMonth: index <= daysInMonth-1 ? true : false
       }
       tempArray.push(tempObj);
     }

    return tempArray
  }

  addReminder(element:any)
  {
    this.openDialog(true, element.data, null, null);
  }

  editReminder(reminderData:any, element:any, elemIndex:any)
  {
    this.openDialog(false, reminderData, element.data, elemIndex);
  }

  sortRecordsByDate(elementData:any)
  {
    this.sortByKey(elementData, "createdOn")
  }

  sortByKey(array:any, key:any) {
    return array.sort(function(a:any, b:any) {
        let x = a[key];
        let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  formatMonth(monthNumber:number)
  {
    let months = moment.months()
    return(months[monthNumber-1])
  }

  openDialog(dialogMode:boolean, dialogData: any, elemRef:any, elemIndex:any)
  {
    if(dialogMode)
    {
      const dialogRef = this.dialogOpen.open(AddReminderDialogComponent, {
        width: '450px',
        height: '450px',
        disableClose:false,
        data: null
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result)
        {
          // console.log(result);
          // console.log(dialogData);
          dialogData.reminder.push(result);
          this.sortRecordsByDate(dialogData.reminder);

          if(this.callendarObj.find((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear))
          {
            let indexVal = this.callendarObj.findIndex((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear)
            this.callendarObj[indexVal] = this.currentMonthObj;
          }

          localStorage.setItem('calendarData', JSON.stringify(this.currentMonthObj))
        }
      });
    }
    else
    {
      const dialogRef = this.dialogOpen.open(AddReminderDialogComponent, {
        width: '450px',
        height: '450px',
        disableClose:false,
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result)
        {
          elemRef.reminder[elemIndex] = result;

          if(this.callendarObj.find((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear))
          {
            let indexVal = this.callendarObj.findIndex((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear)
            this.callendarObj[indexVal] = this.currentMonthObj;
          }

          this.sortRecordsByDate(elemRef.reminder);
          localStorage.setItem('calendarData', JSON.stringify(this.currentMonthObj))
        }
      });
    }
  }

  formatRemindText(text:string)
  {
    return (text.substring(0,3) +"...")
  }

  getForecastData(dayData:any)
  {
    const dialogRef = this.dialogOpen.open(WeatherDialogComponent, {
      width: '800px',
      height: '810px',
      disableClose:false,
      data: dayData.data.reminder
    });
    // this.forecastService.getWeatherByCity('London').subscribe(result =>{
    //   console.log(result)
    // },
    // error =>
    // {
    //   alert(error.message)
    // });
  }

  deleteData(dayData:any)
  {
    const dialogRef = this.dialogOpen.open(DeleteDialogComponent, {
      width: '500px',
      height: '210px',
      disableClose:false,
      data: dayData.data.reminder
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        if(result.mode)
          dayData.data.reminder = [];
        else
        {
          let formData = dayData.data.reminder;
          let itemIndex = formData.findIndex((element:any) => element == result);
          dayData.data.reminder.splice(itemIndex, 1);
        }

        if(this.callendarObj.find((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear))
        {
          let indexVal = this.callendarObj.findIndex((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear)
          this.callendarObj[indexVal] = this.currentMonthObj;
        }

        localStorage.setItem('calendarData', JSON.stringify(this.currentMonthObj))
        localStorage.setItem('calendarStructure', JSON.stringify(this.callendarObj))
      }
    });
  }

  moveMonthInCalendar(moveDirection:boolean)
  {
    // console.log(this.callendarObj);
    // console.log(moveDirection);
    // console.log(this.currentMonth, this.currentYear)
    // console.log(this.currentMonthObj);

    if(moveDirection)
    {
      this.currentMonth += 1;
      if(this.currentMonth > 12)
      {
        this.currentMonth = 1;
        this.currentYear += 1;
      }

      if(this.callendarObj.find((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear))
        this.currentMonthObj = this.callendarObj.find((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear)
      else
      {
        let tempMonthObj = {
          Month: this.currentMonth,
          Year: this.currentYear,
          dayData: this.fillDayData()
        };
        this.currentMonthObj = tempMonthObj;
      }
    }
    else if(!moveDirection)
    {
      this.currentMonth -= 1;
      if(this.currentMonth <= 0)
      {
        this.currentMonth = 12;
        this.currentYear -= 1;
      }

      if(this.callendarObj.find((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear))
        this.currentMonthObj = this.callendarObj.find((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear)
      else
      {
        let tempMonthObj = {
          Month: this.currentMonth,
          Year: this.currentYear,
          dayData: this.fillDayData()
        };
        this.currentMonthObj = tempMonthObj;
      }
    }

    if(!this.callendarObj.find((element:any) => element.Month == this.currentMonth && element.Year == this.currentYear))
      this.callendarObj.push(this.currentMonthObj);
    this.sortByKey(this.callendarObj, 'Year');
    localStorage.setItem('calendarData', JSON.stringify(this.currentMonthObj))
    localStorage.setItem('calendarStructure', JSON.stringify(this.callendarObj))
  }

  isFreeDay(index:number)
  {
    let orderedIndex = index;
    if(orderedIndex % 7 == 0 || (orderedIndex+1) % 7 == 0)
      return true
    else
      return false
  }

}
