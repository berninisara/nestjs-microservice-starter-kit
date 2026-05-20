import { NotFoundException } from '@nestjs/common';

export class NoteNotFoundException extends NotFoundException {
    constructor(readonly id: number) {
    super(`Cannot find note with id=${id}`);
    }
}