import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { UserEntity } from 'src/entities/UserEntity';

export class CreateShortenerLinkDTO {
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	@IsUrl({}, { message: 'Original link must be a valid URL' })
	@ApiProperty({ description: 'The original link to be shortened (URL).' })
	readonly originalLink: string;

	@IsOptional()
	@ApiPropertyOptional({
		description: 'User entity associated with the link (if provided).',
		type: UserEntity,
	})
	readonly user?: UserEntity;
}
