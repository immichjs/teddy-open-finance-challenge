import { ApiProperty } from '@nestjs/swagger';
import { ILinks } from 'src/interfaces/links.interface';

export class UserModel {
	@ApiProperty({ description: 'User ID' })
	id: string;

	@ApiProperty({ description: 'User name' })
	name: string;

	@ApiProperty({ description: 'User email' })
	email: string;

	@ApiProperty({ description: 'User password' })
	password?: string;

	@ApiProperty({ description: 'User creation timestamp' })
	createdAt: Date;

	@ApiProperty({ description: 'User update timestamp' })
	updatedAt: Date;

	@ApiProperty({ description: 'Links related to the user' })
	_links: ILinks;
}
