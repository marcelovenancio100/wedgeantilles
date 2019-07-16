import { TokenNotFoundError } from './token-errors';
import { decodeJwtPayload } from './token-functions';

export class TokenJWT {
  protected payload: any = null;

  constructor(private readonly token: any,
              private createdAt?: Date) {

    try {
      this.parsePayload();
    } catch (err) {
      if (!(err instanceof TokenNotFoundError)) {
        throw err;
      }
    }
    this.createdAt = this.prepareCreatedAt(createdAt);
  }

  getPayload(): any {
    return this.payload;
  }

  protected prepareCreatedAt(date: Date) {
    const decoded = this.getPayload();
    return decoded && decoded.iat ? new Date(Number(decoded.iat) * 1000) : date ? date : new Date();
  }

  protected parsePayload(): void {
    if (!this.token) {
      throw new TokenNotFoundError('Token not found.');
    }
    this.payload = decodeJwtPayload(this.token);
  }

  /**
  * Retorna a data de criação do token.
  * @returns Date
  */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
  * Retorna o valor do token.
  * @returns string
  */
  getValue(): string {
    return this.token;
  }

  /**
  * Retorna a data de expiração do token.
  * @returns Date
  */
  getTokenExpDate(): Date {
    const decoded = this.getPayload();
    if (decoded && !decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  /**
  * Verifica se o token é válido e ainda não expirou.
  * @returns boolean
  */
  isValid(): boolean {
    return !!this.getValue() && (!this.getTokenExpDate() || new Date() < this.getTokenExpDate());
  }

  /**
  * Valida o valor e converte para string.
  * Se o valor não for válido, retorna uma string vazia.
  * @returns string
  */
  toString(): string {
    return !!this.token ? this.token : '';
  }
}
