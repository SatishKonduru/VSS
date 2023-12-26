import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userId : any = ''
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

  getUser(id: any):Observable<any>{
    return this._http.get(this._url+'/user/getUserById/'+id)
  }
 
  updateStatus(data: any){
    return this._http.patch(this._url+'/user/updateStatus/', data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  update(data: any){
    return this._http.patch(this._url+'/user/update/', data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getDepts(){
    return this._http.get(this._url+'/user/dept')
  }

  delete(id: any){
    return this._http.delete(this._url+'/user/delete/'+id,{
      headers: new HttpHeaders().set('Content-Type','application/json')})
  }

//file upload
upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

  formData.append('file', file);

  const req = new HttpRequest('POST', `${this._url}/user/upload`, formData, {
    reportProgress: true,
    responseType: 'json',
  });

  return this._http.request(req);
}
getFiles(): Observable<any> {
  return this._http.get(`${this._url}/user/files`);
}


}
