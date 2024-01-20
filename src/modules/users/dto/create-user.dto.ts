import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDTO {
	@ApiProperty({
		description: 'Name of the user',
		maxLength: 255,
	})
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	@MaxLength(255, { message: 'Name should not exceed 255 characters' })
	readonly name: string;

	@ApiProperty({
		description: 'Email address of the user',
	})
	@IsEmail({}, { message: 'Invalid email format' })
	@IsNotEmpty({ message: 'Email is required' })
	readonly email: string;

	@ApiProperty({
		description: 'User password',
	})
	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	readonly password: string;
}
