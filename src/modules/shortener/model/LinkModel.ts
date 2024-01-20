import { ApiProperty } from '@nestjs/swagger';
import { ILinks } from 'src/interfaces/links.interface';

export class LinkModel {
	@ApiProperty({ description: 'Unique identifier of the link' })
	id: string;

	@ApiProperty({ description: 'Original link before shortening' })
	originalLink: string;

	@ApiProperty({ description: 'Shortened link' })
	shortenedLink: string;

	@ApiProperty({ description: 'Creation date of the link' })
	createdAt: Date;

	@ApiProperty({ description: 'Last update date of the link' })
	updatedAt: Date;

	@ApiProperty({ description: 'Number of clicks on the shortened link' })
	clicks: number;

	links: ILinks;
}
