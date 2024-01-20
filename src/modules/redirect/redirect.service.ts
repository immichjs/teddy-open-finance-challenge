import { Inject, Injectable } from '@nestjs/common';
import { ShortenerService } from '../shortener/shortener.service';

@Injectable()
export class RedirectService {
	@Inject() private readonly shortenerService: ShortenerService;

	async redirect(code: string): Promise<string> {
		const shortenedLink =
			await this.shortenerService.findShortenedLinkByCode(code);

		await this.shortenerService.updateShortenedLinkClick(shortenedLink.id);

		return shortenedLink.originalLink;
	}
}
