import { Injectable } from '@angular/core';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest }
from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class InterceptorService implements HttpInterceptor {
 intercept( request: HttpRequest<any>, next: HttpHandler ):
Observable<HttpEvent<any>> {
 console.log(request);
 request = request.clone({

 headers: new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization': 'Basic ' + btoa('six:onougupa'),
 /*'Access-Control-Allow-Origin': 'http://localhost:4200',
 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-AllowOrigin, Access-Control-Allow-Headers, X-Requested-With',
 'returnFormatVersion': '2',*/
 })
 });
 return next.handle(request);
 }
}
