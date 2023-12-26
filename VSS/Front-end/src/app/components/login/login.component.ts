import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { globalProperties } from '../../shared/globalProperties';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  loginForm: any = FormGroup
  responseMsg: any = ''
  id: any
  constructor(
    private _router: Router, 
    private _formBuilder: FormBuilder, 
    private _dialog: MatDialog,
    private _ngxService: NgxUiLoaderService,
    private _userService: UserService,
    private _snackbar: SnackbarService){}
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['',[Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      password: ['',[Validators.required]]
    })
  }
  userLogin(){
    var formData = this.loginForm.value
    var data = {
      email: formData.email,
      password: formData.password
    }
    this._ngxService.start()
    this._userService.login(data)
    .subscribe((res: any) => {
      this._ngxService.stop()
      localStorage.setItem('token',res.token)
      localStorage.setItem('userId', res.id)
       this._router.navigate(['/vss/dashboard'])
    }, (err: any) => {
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

   forgotPassword(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width= '30rem'
    dialogConfig.position = {top:'5px'}
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this._dialog.open(ForgotPasswordComponent, dialogConfig)
   }

}
