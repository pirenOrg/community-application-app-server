import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(30, { message: 'email is too long' })
  @MinLength(5, { message: 'email is too short' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'min length is 8' })
  @MaxLength(30, { message: 'password is too long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'password Error',
  })
  password: string;
}
