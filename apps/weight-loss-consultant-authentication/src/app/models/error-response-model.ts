export class ErrorResponseModel {
  message: {
    status: number,
    message: string,
    error: string
  }
  constructor(status, message, error) {
    this.message = {
      status: status,
      message: message,
      error: error
    }
  }
}
