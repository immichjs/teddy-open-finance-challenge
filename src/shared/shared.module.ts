import { Module } from '@nestjs/common';
import { UtilsService } from './services/utils/utils.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot()],
	providers: [UtilsService],
	exports: [UtilsService],
})
export class SharedModule {}
