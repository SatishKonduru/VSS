import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalProperties } from '../../../shared/globalProperties';
import { UserService } from '../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar.service';
import { globalAgent } from 'http';
import { slideInFromRight } from '../../../shared/dialog-animations';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrl: './emp.component.css',
 
})
export class EmpComponent implements OnInit{
  empForm : any = FormGroup
  data: any = []
  dialogAction = 'Edit'
  action: any = "Update"
  responseMsg: any = ''
  onEditEmp= new EventEmitter
  constructor(private _formBuilder: FormBuilder, 
    private _userService: UserService, @Inject(MAT_DIALOG_DATA) public dialogData: any, 
    private _dialogRef: MatDialogRef<EmpComponent>,
    private _snackbar: SnackbarService){
      this.getDepts()
    }

  ngOnInit(): void {
    // document.body.classList.add('slide-in-from-left');
    this.empForm = this._formBuilder.group({
      name: [null,[Validators.required, Validators.pattern(globalProperties.nameRegx)]],
      department: [null,[Validators.required]],
      task: [null, Validators.required],
      progress: [null, [Validators.required]]
    })

    if(this.dialogData.action == 'Edit'){
      console.log("Incoming Dialog Data: ", this.dialogData.data)
      this.empForm.patchValue(this.dialogData.data)
    }
  }

  updateEmp(){
    console.log("Updated Data: ", this.empForm.value)
    var formData = this.empForm.value
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      department: formData.department,
      task: formData.task,
      progress: formData.progress
    }

    this._userService.update(data)
    .subscribe((res: any) => {
      this._dialogRef.close()
      this.onEditEmp.emit()
      this.responseMsg = res?.message
      this._snackbar.openSnackbar(this.responseMsg, 'success')
    },(err: any) => {
      this._dialogRef.close()
      if(err.error?.message){
        this.responseMsg = err.error?.message
      }
      else{
        this.responseMsg = globalProperties.genericError
      }
      this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
    })
  }




  getDepts(){
    this._userService.getDepts()
    .subscribe((res: any) => {
      this.data = res
      console.log("Dept Data: ", this.data)
    })
  }
}
