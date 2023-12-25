import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { globalProperties } from '../shared/globalProperties';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService  implements CanActivate{
  auth : any
  constructor(
    private _router: Router,
    private _snackbar: SnackbarService,
    private _injector: Injector) { 
      this.auth = this._injector.get(AuthService)
    }

    canActivate(route: ActivatedRouteSnapshot): boolean  {
      let expectedRoleArray = route.data.expectedRole
      const token: any = localStorage.getItem('token')
      console.log("Token in Route Guard: ", token)
      var tokenPayload : any
      try{
        tokenPayload = jwtDecode(token)
        console.log("token Payload in route Guard: ", tokenPayload)
      }
      catch (err){
        localStorage.clear()
        this._router.navigate(['/'])
      }
      let checkRole = false;
      for(let i = 0; i < expectedRoleArray.length ; i++)
      {
        if(expectedRoleArray[i] == tokenPayload.role){
          checkRole = true
        }
      }
      if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
        if(this.auth.isAuthenticated() && checkRole){return true}
        else{
          this._snackbar.openSnackbar(globalProperties.unauthorized, globalProperties.error)
        }
        this._router.navigate(['/vss/dashboard'])
        return true
      }
      else{
        this._router.navigate(['/login'])
        localStorage.clear()
        return false
      }
    }


}
