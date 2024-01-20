import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SharedModule } from 'src/shared/shared.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
		UsersModule,
		SharedModule,
	],
	providers: [AuthenticationService, JwtStrategy],
	exports: [AuthenticationService],
	controllers: [AuthenticationController],
})
export class AuthenticationModule {}
