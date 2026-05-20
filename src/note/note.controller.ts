import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { NoteRequestDTO } from './dto/note-request.dto';
import { NoteResponseDTO } from './dto/note-response.dto';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  async getNotes(): Promise<NoteResponseDTO[]> {
    return await this.service.getNotes();
  }

  @Get(':id')
  async getNote(@Param('id', ParseIntPipe) id: number): Promise<NoteResponseDTO> {
    return await this.service.getNote(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNote(@Body() request: NoteRequestDTO): Promise<NoteResponseDTO> {
    return await this.service.createNote(request);
  }

  @Put(':id')
  async updateNote(@Param('id', ParseIntPipe) id: number, @Body() request: NoteRequestDTO): Promise<NoteResponseDTO> {
    return await this.service.updateNote(id, request);
  }

  @Delete(':id')
  async deleteNote(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.deleteNote(id);
  }
}
