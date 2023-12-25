import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalProperties } from '../../shared/globalProperties';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm : any = FormGroup
  constructor(private _formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      username: [null,[Validators.required, Validators.pattern(globalProperties.nameRegx)]],
      password: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.pattern(globalProperties.emailRegx)]],
      contactNumber: [null,[Validators.required, Validators.pattern(globalProperties.contactNumberRegex)]]
    })
  }

  userRegister(){

  }

}
