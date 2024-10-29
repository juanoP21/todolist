import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()

  title: string;

  
  @IsString()
  description: string;

    // @IsDate()
  dateend: string;

  state?: string;
}
