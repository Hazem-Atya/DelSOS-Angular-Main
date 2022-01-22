import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageService } from 'app/delsos/sign-in/localstorage.service';
import { Observable } from 'rxjs';
import { SigninService } from 'app/delsos/sign-in/sign-in.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService,
  private signinService : SigninService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler) : Observable<HttpEvent<unknown>>{
    const token = this.localStorageService.get('token');
      req = req.clone({
        url:  req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });


    return next.handle(req);
  }
}


export const AuthentificationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}