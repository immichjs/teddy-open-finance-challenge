import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { ShortenerModule } from '../shortener/shortener.module';

@Module({
	imports: [ShortenerModule],
	controllers: [RedirectController],
	providers: [RedirectService],
})
export class RedirectModule {}
