import { HttpStatusCode } from '../enums/http-status-code';

export class HttpError {
  message: string;
  code: HttpStatusCode;

  constructor(code: number, message: string) {
    this.message = message;
    this.code = code;
  }
}
