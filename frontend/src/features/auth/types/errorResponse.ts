export type FieldError = {
  message: string;
  code?: string;
  param?: string;
}

export class ErrorResponse extends Error {
  status: number;
  errors?: FieldError[];

  constructor(message: string, status: number, errors?: FieldError[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}