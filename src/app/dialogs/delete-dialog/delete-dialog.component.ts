import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  cornerVal:any;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void
  {
    // console.log(this.data);
  }

  deleteReminder(deleteMode:boolean, isAllDelete:boolean)
  {
    if(deleteMode)
    {
      if(!isAllDelete && (this.cornerVal != undefined || this.cornerVal != ""))
        this.dialogRef.close(this.cornerVal)
      else if(isAllDelete)
        this.dialogRef.close({mode:"allDelete"})
    }
    else
      this.dialogRef.close(false)
  }

}
