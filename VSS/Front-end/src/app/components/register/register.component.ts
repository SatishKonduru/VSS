import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalProperties } from '../../shared/globalProperties';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { NavigationEnd, Router } from '@angular/router';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeInRight } from 'ng-animate';
// import { slideInFromLeft } from '../../shared/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInRight', [transition(':enter', useAnimation(fadeInRight))]),
  ],
})
export class RegisterComponent implements OnInit{
  animationTrigger: boolean = false;
  registerForm : any = FormGroup
  responseMsg: any = ''
  data : any =[]
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder, 
    private _ngxService: NgxUiLoaderService,
    private _userService: UserService,
    private _snackbar: SnackbarService,
    private _router: Router){
     
    }
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: [null,[Validators.required, Validators.pattern(globalProperties.nameRegx)]],
      password: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      contactNumber: [null,[Validators.required, Validators.pattern(globalProperties.contactNumberRegex)]],
      department: [null,[Validators.required]]
    })
    
  }

  userRegister(){
    
   this._ngxService.start()
   var formData = this.registerForm.value
   console.log("Data: ", formData)
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
