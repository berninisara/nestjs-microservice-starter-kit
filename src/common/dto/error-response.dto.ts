import { HttpStatus } from "@nestjs/common";

export class ErrorResponseDTO{
    status! : HttpStatus;
    message! : string;
    timestamp! : string;
    validationErrors?: string[];

    constructor(partial: Partial<ErrorResponseDTO>) {
        Object.assign(this, partial);
        this.timestamp = new Date().toISOString();
    }
    }