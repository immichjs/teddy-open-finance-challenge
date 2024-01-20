import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	Inject,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { LinkEntity } from 'src/entities/LinkEntity';
import { JwtAuthGuard } from '../authentication/guards/jwt.guard';
import { ShortenerService } from './shortener.service';
import { CreateShortenerLinkDTO } from './dto/create-shortener-link.dto';
import { LinkModel } from './model/LinkModel';

@Controller('shortener')
@ApiTags('Shortener')
export class ShortenerController {
	@Inject() private readonly shortenerService: ShortenerService;

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get all links' })
	@ApiOkResponse({
		description: 'List of all links',
		type: LinkEntity,
		isArray: true,
	})
	async findAllLinks(): Promise<LinkEntity[]> {
		return this.shortenerService.findAllLinks();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get shortened link' })
	@ApiOkResponse({
		description: 'List of all links',
		type: LinkEntity,
		isArray: true,
	})
	async findLinkById(
		@Param(
			'id',
			new ParseUUIDPipe({
				version: '4',
				errorHttpStatusCode: 400,
			}),
		)
		shortenedLinkId: string,
	): Promise<LinkEntity> {
		return this.shortenerService.findLinkById(shortenedLinkId);
	}

	@Post()
	@ApiOperation({ summary: 'Create a new link' })
	@ApiCreatedResponse({
		description: 'Link created successfully',
		type: LinkModel,
	})
	@ApiBadRequestResponse({ description: 'Invalid data' })
	async createShortenerLink(
		@Body() shortenerLink: CreateShortenerLinkDTO,
		@Headers('authorization') token: string,
	) {
		return this.shortenerService.createShortenerLink(shortenerLink, token);
	}

	@Patch(':id/click')
	@ApiOperation({ summary: 'Updates clicks on shortened links' })
	@ApiCreatedResponse({
		description: 'Click successfully increased',
		type: LinkModel,
	})
	async updateShortenedLinkClick(
		@Param(
			'id',
			new ParseUUIDPipe({
				version: '4',
				errorHttpStatusCode: 400,
			}),
		)
		shortenedLinkId: string,
	) {
		return this.shortenerService.updateShortenedLinkClick(shortenedLinkId);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete a shortened link by ID' })
	@ApiOkResponse({ description: 'Shortened link deleted successfully' })
	@ApiNotFoundResponse({ description: 'Shortened link not found' })
	async deleteShortenedLink(
		@Param(
			'id',
			new ParseUUIDPipe({
				version: '4',
				errorHttpStatusCode: 400,
			}),
		)
		shortenedLinkId: string,
	): Promise<void> {
		return this.shortenerService.deleteShortenedLink(shortenedLinkId);
	}
}
