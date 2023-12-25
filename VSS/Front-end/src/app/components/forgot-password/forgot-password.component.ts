import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalProperties } from '../../shared/globalProperties';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
forgotPasswordForm : any = FormGroup
responseMsg: any = ''
constructor(private _formBuilder: FormBuilder, 
  private _dialogRef: MatDialogRef<ForgotPasswordComponent>,
  private _ngxService: NgxUiLoaderService, 
  private _userService: UserService,
  private _snackbar: SnackbarService){}
ngOnInit(): void {
  this.forgotPasswordForm = this._formBuilder.group({
    email: [null, [Validators.required, Validators.pattern(globalProperties.emailRegx)]]
  })
}

getPassword(){
   this._ngxService.start()
  var formData = this.forgotPasswordForm.value
  var data = {
    email: formData.email
  }
  this._userService.forgotPassword(data)
  .subscribe((res: any) => {
    this._dialogRef.close()
    this._ngxService.stop()
    this.responseMsg = res?.message
    this._snackbar.openSnackbar(this.responseMsg,'')
},(err: any) => {
  this._ngxService.stop()
  if(err.error?.message){
    this.responseMsg = err.error?.message
  }
  else{
    this.responseMsg = globalProperties.genericError
  }
  this._snackbar.openSnackbar(this.responseMsg, globalProperties.error)
})

}

}
