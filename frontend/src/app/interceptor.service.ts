import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let dupReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
    let t = localStorage.getItem('token');
    if (t) {
      let token = 'Token ' + t;
      dupReq = req.clone({
        setHeaders: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(dupReq);
  }
}


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})


export class Interceptor { }