import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { globalProperties } from '../../shared/globalProperties';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  loginForm: any = FormGroup
  constructor(private _router: Router, private _formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['',[Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      password: ['',[Validators.required]]
    })
  }
  userLogin(){
    this._router.navigate(['/admin/dashboard'])
     console.log('User Login Details: ', this.loginForm.value)
   
   }

}
