import { Injectable, Inject } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AuthJWTResult } from './auth-jwt.result';
import { TokenService } from './token/token.service';
import { TokenJWT } from './token/token-jwt';
import { IllegalTokenError } from './token/token-errors';
import { AuthJWTConfig } from './auth-jwt.config';

@Injectable()
export class AuthJWTService {

  constructor(private tokenService: TokenService,
              private http: HttpClient,
              @Inject('authJWTConfig') private authJWTConfig: AuthJWTConfig) {}

  /**
  * Retorna o token atual armazenado.
  * @returns Observable<any>
  */
  getToken(): Observable<TokenJWT> {
    return this.tokenService.get();
  }

  /**
  * Verifica se existe um token armazenado.
  * @returns Observable<boolean>
  */
  isAuthenticated(): Observable<boolean> {
    return this.getToken()
      .pipe(map((tokenJWT: TokenJWT) => tokenJWT != null && tokenJWT.isValid()));
  }

  /**
  * Autenticação a partir dos dados informados.
  * @param data
  * @returns Observable<AuthJWTResult>
  */
  authenticate(data?: any): Observable<AuthJWTResult> {
    return this.http.request('post', `${this.authJWTConfig.baseEndpoint}/login`, { body: data, observe: 'response' })
      .pipe(
        map((res) => {
          return new AuthJWTResult(true, res, [], [], new TokenJWT(res.headers.get('authorization').replace('Bearer ', '')));
        }),
        switchMap((authJWTResult: AuthJWTResult) => {
          return this.processResultToken(authJWTResult);
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'login');
        })
      );
  }

  /**
  * Logout do usuário e remoção do token armazenado.
  * @returns Observable<AuthJWTResult>
  */
  logout(): Observable<AuthJWTResult> {
    const url = undefined;

    return observableOf({})
      .pipe(
        switchMap((res: any) => {
          if (!url) {
            return observableOf(res);
          }
          return this.http.request('post', url, {observe: 'response'});
        }),
        map((res) => {
          this.tokenService.clear();
          return new AuthJWTResult(true, res, [], []);
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'logout');
        })
      );
  }

  private processResultToken(authJWTResult: AuthJWTResult) {
    if (authJWTResult.isSuccess() && authJWTResult.getToken()) {
      return this.tokenService.set(authJWTResult.getToken())
        .pipe(
          map((tokenJWT: TokenJWT) => {
            return authJWTResult;
          }),
        );
    }
    return observableOf(authJWTResult);
  }

  private handleResponseError(res: any, module: string): Observable<AuthJWTResult> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      errors = res.error;
    } else if (res instanceof IllegalTokenError) {
      errors.push(res.message)
    } else {
      errors.push('Something went wrong.');
    }
    return observableOf(new AuthJWTResult(false, res, errors, []));
  }
}
