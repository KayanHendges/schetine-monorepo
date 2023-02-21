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

    if (exception?.message.includes('Invalid credentials')) {
      status = 401;
      message = exception.message;
    }

    if (exception?.message.includes('not found')) {
      status = 404;
      message = exception.message;
    }

    if (exception?.message.includes('Permission denied')) {
      status = 403;
      message = exception.message;
    }

    if (exceptionObj?.code === 'P2002') {
      const targets = exceptionObj?.meta?.target;
      status = 400;
      message = `${targets.length > 1 ? 'these' : 'this'} ${targets.join(
        ', ',
      )} already exists`;
    }

    if (exceptionObj?.code === 'P2003') {
      let field_name = exceptionObj?.meta?.field_name;
      status = 400;

      if (
        typeof field_name === 'string' &&
        field_name.match(/^business_professionals_+([\w]+_)+fkey \(index\)$/g)
      ) {
        field_name = field_name.replace(
          /business_professionals_|_id_fkey \(index\)/g,
          '',
        );
      }

      status = 404;
      message = `${
        field_name || 'unknown'
      } field does not exist or is not valid.`;
    }

    if (exceptionObj?.code === 'P2025') {
      status = 404;
      message = exceptionObj?.meta?.cause || 'not found';
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
