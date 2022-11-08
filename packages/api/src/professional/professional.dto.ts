import { IsEmail, IsString } from 'class-validator';

export class CreateProfessionalDTO {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;
}
