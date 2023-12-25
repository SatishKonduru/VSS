import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) { }

  isAuthenticated():boolean {
    const token = localStorage.getItem('token')
    if(!token){
      this._router.navigate(['/login'])
      return false
    }
    else{
      return true
    }
  }
}
