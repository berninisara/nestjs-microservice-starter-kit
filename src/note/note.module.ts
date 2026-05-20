import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './entity/note.entity';
import { NoteController } from './note.controller';
import { NoteMapper } from './note.mapper';
import { NoteService } from './note.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteMapper],
  imports: [TypeOrmModule.forFeature([NoteEntity])],
})
export class NoteModule {}
