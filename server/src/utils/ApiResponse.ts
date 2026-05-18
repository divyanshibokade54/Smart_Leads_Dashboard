export interface ApiResponsePayload<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: Record<string, unknown>;
}

export class ApiResponse {
  static success<T>(
    data: T,
    message = 'Success',
    meta?: Record<string, unknown>,
  ): ApiResponsePayload<T> {
    return {
      success: true,
      message,
      data,
      ...(meta && { meta }),
    };
  }

  static error(message = 'Error', meta?: Record<string, unknown>): ApiResponsePayload<null> {
    return {
      success: false,
      message,
      data: null,
      ...(meta && { meta }),
    };
  }
}
