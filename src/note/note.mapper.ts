import { Injectable } from 'node_modules/@nestjs/common';
import { NoteRequestDTO } from './dto/note-request.dto';
import { NoteResponseDTO } from './dto/note-response.dto';
import { NoteEntity } from './entity/note.entity';

@Injectable()
export class NoteMapper {
  toResponse(note: NoteEntity | null): NoteResponseDTO | null {
    if (!note) {
      return null;
    }
    const response = new NoteResponseDTO();
    response.id = note.id;
    response.title = note.title;
    response.content = note.content;
    return response;
  }

  toEntity(request: NoteRequestDTO | null): NoteEntity | null {
    if (!request) return null;

    const note = new NoteEntity();
    note.title = request.title;
    note.content = request.content;
    return note;
  }
}
