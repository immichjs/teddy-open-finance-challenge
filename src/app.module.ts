import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/UserEntity';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ShortenerModule } from './modules/shortener/shortener.module';
import { LinkEntity } from './entities/LinkEntity';
import { SharedModule } from './shared/shared.module';
import { RedirectModule } from './modules/redirect/redirect.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			entities: [UserEntity, LinkEntity],
			synchronize: true,
		}),
		UsersModule,
		AuthenticationModule,
		ShortenerModule,
		SharedModule,
		RedirectModule,
	],
})
export class AppModule {}
