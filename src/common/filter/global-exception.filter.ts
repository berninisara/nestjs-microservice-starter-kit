import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { NoteNotFoundException } from '../note-not-found.exception';
import { ErrorResponseDTO } from '../dto/error-response.dto';
// Ipotizzo le tue importazioni per NoteNotFoundException ed ErrorResponseDTO

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof NoteNotFoundException) {
      return this.handleNotFound(exception, response);
    }

    if (exception instanceof BadRequestException) {
      return this.handleValidation(exception, response);
    }
    
  }

  private handleNotFound(exception: NoteNotFoundException, response: Response): void {
    const status = HttpStatus.NOT_FOUND;
    const body = new ErrorResponseDTO({ 
      status, 
      message: exception.message 
    });

    response.status(status).json(body);
  }

  private handleValidation(exception: BadRequestException, response: Response): void {
    const status = HttpStatus.BAD_REQUEST;
    const exceptionResponse = exception.getResponse() as { message: string[] };
    const body = new ErrorResponseDTO({
      status,
      message: 'Validation failed',
      validationErrors: exceptionResponse.message,
    });

    response.status(status).json(body);
  }
}