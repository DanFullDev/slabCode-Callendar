import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-reminder-dialog',
  templateUrl: './add-reminder-dialog.component.html',
  styleUrls: ['./add-reminder-dialog.component.css']
})
export class AddReminderDialogComponent implements OnInit {

  reminderForm = new FormGroup({
    descriptionField: new FormControl('', [Validators.required]),
    cityField: new FormControl('', [Validators.required]),
    colorField: new FormControl('', [Validators.required]),
    dateField: new FormControl('', [Validators.required])
  });

  updateForm = new FormGroup({
    updateTextField: new FormControl('', [Validators.required]),
    updateCityField: new FormControl('', [Validators.required]),
    updateColorField: new FormControl('', [Validators.required]),
    updateDateField: new FormControl('', [Validators.required])
  });

  color:any = "";
  descrpText:any = "";
  cityVal:any = "";
  timeVal:any = "";

  constructor( public dialogRef: MatDialogRef<AddReminderDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void
  {
    // console.log(this.data);
    if(this.data)
    {
      let timeTemp = new Date(this.data.createdOn)
      this.descrpText = this.data.reminderText;
      this.cityVal = this.data.city;
      this.color = this.data.color
      this.timeVal = (timeTemp.getUTCHours() < 10 ? ("0" + ((timeTemp.getUTCHours()).toString())) : (timeTemp.getUTCHours()).toString()) + ":" + (timeTemp.getMinutes() < 10 ? ("0" + ((timeTemp.getMinutes()).toString())) : (timeTemp.getMinutes()).toString());

      this.updateForm.get('updateTextField')?.setValue(this.descrpText);
      this.updateForm.get('updateCityField')?.setValue(this.cityVal);
      this.updateForm.get('updateDateField')?.setValue(this.timeVal);

    }
  }


  updateReminder()
  {

    let inputVal = this.updateForm.get('updateDateField')?.value.split(":")
    let currentDate = new Date();
    currentDate.setHours(parseInt(inputVal[0]));
    currentDate.setMinutes(parseInt(inputVal[1]));
    currentDate.setSeconds(0);

    this.updateForm.get('updateColorField')?.setValue(this.color);

    if(this.updateForm.valid)
    {
      let reminderData = {
        reminderText:  this.updateForm.get('updateTextField')?.value,
        city:  this.updateForm.get('updateCityField')?.value,
        color: this.updateForm.get('updateColorField')?.value,
        createdOn: currentDate.toUTCString(),
      }
      this.dialogRef.close(reminderData)
    }
    else
      alert("Fields not filled");
  }

  addReminder(selectionMode:boolean)
  {
    this.reminderForm.get('colorField')?.setValue(this.color);
    if(selectionMode)
    {
      if(this.reminderForm.valid)
      {
        let inputVal = this.reminderForm.get('dateField')?.value.split(":")
        let currentDate = new Date();
        currentDate.setHours(parseInt(inputVal[0]));
        currentDate.setMinutes(parseInt(inputVal[1]));
        currentDate.setSeconds(0);

        let reminderData = {
          reminderText: this.reminderForm.get('descriptionField')?.value,
          city: this.reminderForm.get('cityField')?.value,
          color: this.reminderForm.get('colorField')?.value,
          createdOn: currentDate.toUTCString(),
        }
        this.dialogRef.close(reminderData)
      }
      else
        alert("Fields not filled");
    }
    else
    {
      this.dialogRef.close(false)
    }
  }

}
