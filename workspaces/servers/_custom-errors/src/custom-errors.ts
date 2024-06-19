export class CustomError extends Error {
  constructor(
    public statusCode: number,
    message?: string,
    public returnValue: any,
  ) {
    super(message);
  }
}

export const createError = (statusCode: number, message: string, returnValue: any) =>
  new CustomError(statusCode, message, returnValue);

export const BAD_REQUEST = () => new CustomError(400, 'Bad Request');
export const UNAUTHORIZED = () => new CustomError(401, 'Unauthorized');
export const BAD_CREDENTIALS = () => new CustomError(402, 'Bad Credentials');
export const FORBIDDEN = () => new CustomError(403, 'Forbidden');
export const NOT_FOUND = () => new CustomError(404, 'Not Found');
export const METHOD_NOT_ALLOWED = () => new CustomError(405, 'Method Not Allowed');
export const CONFLICT = () => new CustomError(409, 'Conflict');
export const GONE = () => new CustomError(410, 'Gone');

export const INTERNAL_SERVER_ERROR = (message, returnValue) => new CustomError(500, message, returnValue);

export const USER_ALREADY_EXISTS = () => new CustomError(511, 'the email address already exists on our platform');
export const AUDIENCE_ERROR = () =>
  new CustomError(512, 'there was an error creating the audience in Google Analytics');
