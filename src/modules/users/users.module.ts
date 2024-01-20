import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/UserEntity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
