export interface IApiException {
  message: string;
  statusCode: number;
  response?: unknown;
}

class ApiException implements IApiException {
  message: string;
  statusCode: number;
  response?: unknown;

  constructor(message: string, statusCode: number, response?: unknown) {
    this.message = message;
    this.statusCode = statusCode;
    this.response = response;
  }
}
export default ApiException;
