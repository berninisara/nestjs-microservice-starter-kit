import { IsDefined, MaxLength } from "node_modules/class-validator/types";
import { IsNotEmpty } from "node_modules/class-validator/types/decorator/common/IsNotEmpty";
import { IsString } from "node_modules/class-validator/types/decorator/typechecker/IsString";

export class NoteRequestDTO {
  @IsString()
  @IsNotEmpty({message: 'Title is mandatory'})
  @MaxLength(255, {message: 'Title cannot exceed 255 characters'})
  title!: string;
  @IsString()
  @IsDefined({message: 'Content must be provided'})
  @MaxLength(2000, {message: 'Content cannot exceed 2000 characters'})
  content!: string;
}
