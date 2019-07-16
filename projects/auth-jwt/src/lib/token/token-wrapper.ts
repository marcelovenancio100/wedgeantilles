import { Injectable } from '@angular/core';

import { TokenJWT } from './token-jwt';
import { TokenPack } from './token-pack';

@Injectable()
export class TokenWrapper {

  constructor() {}

  wrap(tokenJWT: TokenJWT): string {
    return JSON.stringify({
      value: tokenJWT.toString(),
      createdAt: tokenJWT.getCreatedAt().getTime(),
    });
  }

  unwrap(value: string): TokenJWT {
    let tokenValue = '';
    let tokenCreatedAt: Date = null;

    const tokenPack: TokenPack = this.parseTokenPack(value);
    if (tokenPack) {
      tokenValue = tokenPack.value;
      tokenCreatedAt = new Date(Number(tokenPack.createdAt));
    }

    return new TokenJWT(tokenValue, tokenCreatedAt);
  }

  protected parseTokenPack(value): TokenPack {
    try {
      return JSON.parse(value);
    } catch (e) {}

    return null;
  }
}
