import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from 'src/entities/LinkEntity';
import { Repository } from 'typeorm';
import { CreateShortenerLinkDTO } from './dto/create-shortener-link.dto';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class ShortenerService {
	@InjectRepository(LinkEntity)
	private readonly linkRepository: Repository<LinkEntity>;

	@Inject() private readonly utilsService: UtilsService;
	@Inject() private readonly authenticationService: AuthenticationService;

	async findAllLinks(): Promise<LinkEntity[]> {
		const links = await this.linkRepository
			.createQueryBuilder('links')
			.where('links.deletionDate IS NULL')
			.getMany();

		return links;
	}

	async findLinkById(id: string) {
		const shortenedLink = await this.linkRepository
			.createQueryBuilder('links')
			.where('links.deletionDate IS NULL')
			.getOne();

		return {
			...shortenedLink,
			_links: this.utilsService.mountLinks(id, 'shortener'),
		};
	}

	async findShortenedLinkByCode(code: string) {
		const shortenedLink = await this.linkRepository
			.createQueryBuilder('links')
			.where('links.deletionDate IS NULL')
			.andWhere('links.shortenedLink LIKE :shortenedLink', {
				shortenedLink: `${code}%`,
			})
			.getOne();

		if (!shortenedLink) {
			throw new NotFoundException('Shortened link not found');
		}

		return shortenedLink;
	}

	async createShortenerLink(
		{ originalLink }: CreateShortenerLinkDTO,
		token?: string,
	) {
		let user;

		if (token) {
			user = await this.authenticationService.validateAccessToken(
				token.split(' ')[1],
			);
		}

		const shortenedLink = this.utilsService.generateRandomCode(6);
		const shortened = await this.linkRepository.create({
			originalLink,
			shortenedLink,
			user,
		});

		const savedShortened = await this.linkRepository.save(shortened);

		return {
			...savedShortened,
			_links: {
				use: {
					href: `${process.env.URL}/redirect/${savedShortened.shortenedLink}`,
					method: 'GET',
				},
				...this.utilsService.mountLinks(savedShortened.id, 'shortener'),
			},
		};
	}

	async updateShortenedLinkClick(id: string) {
		const shortenedLink = await this.linkRepository.findOne({
			where: {
				id,
			},
		});

		if (!shortenedLink) {
			throw new NotFoundException('Shortened link not found');
		}

		shortenedLink.clicks++;

		const savedShortenedLink = await this.linkRepository.save(shortenedLink);

		return {
			...savedShortenedLink,
		};
	}

	async deleteShortenedLink(shortenedLinkId: string): Promise<void> {
		const shortenedLink = await this.linkRepository.findOne({
			where: {
				id: shortenedLinkId,
			},
		});

		if (!shortenedLink) {
			throw new NotFoundException(`Shortened link not found`);
		}

		shortenedLink.deletionDate = new Date();

		await this.linkRepository.save(shortenedLink);
	}
}
