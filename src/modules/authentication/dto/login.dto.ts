import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
	@ApiProperty({
		description: 'User email',
		example: 'user@example.com',
	})
	@IsEmail({}, { message: 'Invalid email format' })
	email: string;

	@ApiProperty({
		description: 'User password',
		example: 'secretpassword',
	})
	@IsNotEmpty({ message: 'Password cannot be empty' })
	password: string;
}
