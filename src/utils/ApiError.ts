class ApiError extends Error {
  statusCode: number;
  success: boolean;
  data?: unknown;
  errors?: string[];

  constructor(
    statusCode: number = 500,
    message: string,
    errors: string[] = [],
    data?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;