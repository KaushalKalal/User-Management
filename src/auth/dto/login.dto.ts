import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid Credentials' })
  email: string;

  @MinLength(6, { message: 'Invalid Credentials' })
  password: string;
}
