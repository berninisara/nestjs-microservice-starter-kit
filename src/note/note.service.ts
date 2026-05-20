import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'node_modules/@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteRequestDTO } from './dto/note-request.dto';
import { NoteResponseDTO } from './dto/note-response.dto';
import { NoteEntity } from './entity/note.entity';
import { NoteMapper } from './note.mapper';
import { NoteNotFoundException } from '../common/note-not-found.exception';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity) private readonly repository: Repository<NoteEntity>,
    private readonly mapper: NoteMapper,
  ) {}

  async getNotes(): Promise<NoteResponseDTO[]> {
    const notes = await this.repository.find();
    return notes.map((note) => this.mapper.toResponse(note)!);
  }

  async getNote(id: number): Promise<NoteResponseDTO> {
    const retrievedNote = await this.repository.findOneBy({ id });
    if (!retrievedNote) {
      throw new NoteNotFoundException(id);
    }
    return this.mapper.toResponse(retrievedNote)!;
  }

  async createNote(request: NoteRequestDTO): Promise<NoteResponseDTO> {
    const noteEntity = this.mapper.toEntity(request);
    const createdNote = await this.repository.save(noteEntity!);
    return this.mapper.toResponse(createdNote)!;
  }

  async updateNote(id: number, request: NoteRequestDTO): Promise<NoteResponseDTO> {
    const retrievedNote = await this.repository.findOneBy({ id });
    if (!retrievedNote) {
      throw new NoteNotFoundException(id);
    }

    retrievedNote.title = request.title;
    retrievedNote.content = request.content;

    const updatedNote = await this.repository.save(retrievedNote);
    return this.mapper.toResponse(updatedNote)!;
  }

  async deleteNote(id: number): Promise<void> {
    const retrievedNote = await this.repository.findOneBy({ id });
    if (!retrievedNote) {
      throw new NoteNotFoundException(id);
    }
    await this.repository.remove(retrievedNote);
  }
}
