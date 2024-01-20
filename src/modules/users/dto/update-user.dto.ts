import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDTO {
	@ApiProperty({
		required: false,
		description: 'Optional: User name',
		maxLength: 255,
	})
	@IsOptional()
	@IsString({ message: 'Name must be a string' })
	@MaxLength(255, { message: 'Name should have at most 255 characters' })
	readonly name?: string;

	@ApiProperty({
		required: false,
		description: 'Optional: User email',
		format: 'email',
	})
	@IsOptional()
	@IsEmail({}, { message: 'Invalid email format' })
	readonly email?: string;

	@ApiProperty({
		required: false,
		description: 'Optional: User password',
	})
	@IsOptional()
	@IsString({ message: 'Password must be a string' })
	readonly password?: string;
}
