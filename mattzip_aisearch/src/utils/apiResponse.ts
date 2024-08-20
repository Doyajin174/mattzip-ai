export interface ApiResponse<T> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
  }
  
  export const successResponse = <T>(data: T): ApiResponse<T> => ({
    status: 'success',
    data,
  });
  
  export const errorResponse = (message: string): ApiResponse<null> => ({
    status: 'error',
    message,
  });