import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalProperties } from '../../shared/globalProperties';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm : any = FormGroup
  responseMsg: any = ''
  constructor(
    private _formBuilder: FormBuilder, 
    private _ngxService: NgxUiLoaderService,
    private _userService: UserService,
    private _snackbar: SnackbarService,
    private _router: Router){}
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      username: [null,[Validators.required, Validators.pattern(globalProperties.nameRegx)]],
      password: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      contactNumber: [null,[Validators.required, Validators.pattern(globalProperties.contactNumberRegex)]],
      department: [null,[Validators.required]]
    })
  }

  userRegister(){
   this._ngxService.start()
   var formData = this.registerForm.value
   var data = {
    name: formData.name,
    contactNumber: formData.contactNumber,
    email: formData.email,
    password: formData.password,
    department: formData.department
   }
   this._userService.register(data)
   .subscribe(res => {
    this._ngxService.stop()
    this.responseMsg = res?.message
    this._snackbar.openSnackbar(this.responseMsg,'')
    this._router.navigate(['/login'])
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

}
