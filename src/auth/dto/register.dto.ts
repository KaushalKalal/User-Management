import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
