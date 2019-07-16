import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { filter, share } from 'rxjs/operators';

import { TokenStorage } from './token-storage';
import { TokenJWT } from './token-jwt';

@Injectable()
export class TokenService {
  protected token$: BehaviorSubject<TokenJWT> = new BehaviorSubject(null);

  constructor(protected tokenStorage: TokenStorage) {
    this.publishStoredToken();
  }

  /**
  * Publica o token quando ele é alterado.
  * @returns Observable<TokenJWT>
  */
  tokenChange(): Observable<TokenJWT> {
    return this.token$
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  /**
  * Seta o token no armazenamento.
  * Este método é usado pelo AuthService automaticamente.
  * @param TokenJWT tokenJWT
  * @returns Observable<any>
  */
  set(tokenJWT: TokenJWT): Observable<null> {
    this.tokenStorage.set(tokenJWT);
    this.publishStoredToken();
    return observableOf(null);
  }

  /**
  * Retorna um observable do token corrente.
  * @returns Observable<TokenJWT>
  */
  get(): Observable<TokenJWT> {
    const tokenJWT = this.tokenStorage.get();
    return observableOf(tokenJWT);
  }

  /**
  * Remove o token e o valor do token publicado.
  * @returns Observable<any>
  */
  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorage.get());
  }
}
