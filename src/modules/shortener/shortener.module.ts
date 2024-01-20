import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/UserEntity';
import { LinkEntity } from 'src/entities/LinkEntity';
import { SharedModule } from 'src/shared/shared.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, LinkEntity]),
		AuthenticationModule,
		SharedModule,
	],
	providers: [ShortenerService],
	exports: [ShortenerService],
	controllers: [ShortenerController],
})
export class ShortenerModule {}
