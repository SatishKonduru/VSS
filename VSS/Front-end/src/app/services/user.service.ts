import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = environment.apiURL;
  constructor(private _http: HttpClient) { }

  register(data: any) :Observable<any>{
    return this._http.post(this._url+'/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  forgotPassword(data: any):Observable<any>{
    return this._http.post(this._url+'/user/forgotPassword', data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  login(data: any):Observable<any>{
    return this._http.post(this._url+'/user/login', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getUsersList():Observable<any>{
    return this._http.get(this._url+'/user/getUsers')
  }


}
