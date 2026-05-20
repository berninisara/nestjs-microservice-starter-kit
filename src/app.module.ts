import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteEntity } from './note/entity/note.entity';
import { NoteModule } from './note/note.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [NoteEntity],
        synchronize: true,
        logging: true,
      }),
    }),
    NoteModule,
  ],
})
export class AppModule {}
