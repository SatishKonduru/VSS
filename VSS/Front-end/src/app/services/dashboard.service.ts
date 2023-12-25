import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private _url = environment.apiURL
  constructor(private _http: HttpClient) { }

  getDashboardDetails(){
    return this._http.get(this._url+'/dashboard/details')
  }

}
