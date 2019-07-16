import { Injectable } from '@angular/core';

import { TokenWrapper } from './token-wrapper';
import { TokenJWT } from './token-jwt';

@Injectable()
export class TokenStorage {
    protected key = 'auth_app_token';

    constructor(private tokenWrapper: TokenWrapper) {}

    /**
    * Retorna o token armazenado em localStorage.
    * @returns TokenJWT
    */
    get(): TokenJWT {
        const raw = localStorage.getItem(this.key);
        return this.tokenWrapper.unwrap(raw);
    }

    /**
    * Seta o token no localStorage.
    * @param TokenJWT tokenJWT
    */
    set(tokenJWT: TokenJWT) {
        const raw = this.tokenWrapper.wrap(tokenJWT);
        localStorage.setItem(this.key, raw);
    }

    /**
    * Limpa o token do localStorage.
    */
    clear() {
        localStorage.removeItem(this.key);
    }
}
