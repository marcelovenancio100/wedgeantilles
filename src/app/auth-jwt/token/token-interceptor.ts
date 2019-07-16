import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthJWTService } from '../auth-jwt.service';
import { TokenJWT } from './token-jwt';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authJWTService: AuthJWTService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authJWTService.getToken()
      .pipe(
        switchMap((tokenJWT: TokenJWT) => {
          if (tokenJWT && tokenJWT.getValue()) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${tokenJWT.getValue()}`
              },
            });
          }
          return next.handle(req);
        })
      );
  }
}
