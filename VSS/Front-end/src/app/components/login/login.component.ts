import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { globalProperties } from '../../shared/globalProperties';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  loginForm: any = FormGroup
  constructor(private _router: Router, private _formBuilder: FormBuilder, private _dialog: MatDialog){}
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['',[Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      password: ['',[Validators.required]]
    })
  }
  userLogin(){
    this._router.navigate(['/vss/dashboard'])
     console.log('User Login Details: ', this.loginForm.value)
   
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
