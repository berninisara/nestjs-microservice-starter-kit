import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notes')
export class NoteEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ type: 'varchar', length: 255, name: 'title', nullable: false })
  title!: string;

  @Column({ type: 'text', name: 'content', nullable: false })
  content!: string;
}
