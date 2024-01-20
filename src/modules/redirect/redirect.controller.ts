import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('redirect')
@ApiTags('Redirect')
export class RedirectController {
	@Inject() private readonly redirectService: RedirectService;

	@Get(':code')
	async redirect(@Param('code') code: string, @Res() res: Response) {
		const originalURL = await this.redirectService.redirect(code);
		return res.redirect(302, originalURL);
	}
}
