import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (process.env.NODE_ENV === 'development')
      Logger.debug(JSON.stringify({ exception, url: request.url }, null, 2));

    const response = ctx.getResponse<Response>();

    let message = 'Internal server error';
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status !== HttpStatus.INTERNAL_SERVER_ERROR) {
      message =
        (exception as Record<string, any>)?.response?.message ||
        exception.message;
    }

    const exceptionObj = JSON.parse(JSON.stringify(exception));

    if (exceptionObj?.code === 'P2002') {
      const targets = exceptionObj?.meta?.target;
      status = 400;
      message = `${targets.length > 1 ? 'these' : 'this'} ${targets.join(
        ', ',
      )} already exists`;
    }

    if (exception?.message.includes('not found')) {
      status = 404;
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
