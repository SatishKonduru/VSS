import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,  HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, catchError, throwError } from 'rxjs';
@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(private _router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    const token = localStorage.getItem('token')
    console.log("Token from localstorage in Interceptor: ", token)
    if(token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` 
        } 
      })
    }
    console.log("Token in Interceptor: ", request)
    return next.handle(request).pipe(catchError((err ) => {
      if(err instanceof HttpErrorResponse){
        console.log(err.url)
        if(err.status === 401 || err.status === 403){
          if(this._router.url === '/'){}
          else{
            localStorage.clear()
            this._router.navigate(['/'])
          }
        }
      }
      return throwError(err)
    }))
  }
}