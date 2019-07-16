import { TokenJWT } from './token/token-jwt';

export class AuthJWTResult {
  protected tokenJWT: TokenJWT;
  protected errors: string[] = [];
  protected messages: string[] = [];

  constructor(protected success: boolean,
              protected response?: any,
              errors?: any,
              messages?: any,
              tokenJWT: TokenJWT = null) {

    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }

    this.messages = this.messages.concat([messages]);
    if (messages instanceof Array) {
      this.messages = messages;
    }

    this.tokenJWT = tokenJWT;
  }

  getResponse(): any {
    return this.response;
  }

  getToken(): TokenJWT {
    return this.tokenJWT;
  }

  getErrors(): string[] {
    return this.errors.filter(val => !!val);
  }

  getMessages(): string[] {
    return this.messages.filter(val => !!val);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }
}
