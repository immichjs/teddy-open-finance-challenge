import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	Inject,
	ParseUUIDPipe,
	UseGuards,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiCreatedResponse,
} from '@nestjs/swagger';

import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from 'src/entities/UserEntity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserModel } from './model/UserModel';
import { JwtAuthGuard } from '../authentication/guards/jwt.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
	@Inject() private readonly usersService: UsersService;

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get all users' })
	@ApiOkResponse({
		description: 'List of all users',
		type: UserEntity,
		isArray: true,
	})
	async findAllUsers(): Promise<UserEntity[]> {
		return this.usersService.findAllUsers();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get a user by ID' })
	@ApiOkResponse({ description: 'User found', type: UserEntity })
	@ApiNotFoundResponse({ description: 'User not found' })
	findUserById(
		@Param(
			'id',
			new ParseUUIDPipe({
				version: '4',
				errorHttpStatusCode: 400,
			}),
		)
		userId: string,
	): Promise<UserModel> {
		return this.usersService.findUserById(userId);
	}

	@Post()
	@ApiOperation({ summary: 'Create a new user' })
	@ApiCreatedResponse({
		description: 'User created successfully',
		type: UserModel,
	})
	@ApiBadRequestResponse({ description: 'Invalid data' })
	async createUser(@Body() userData: CreateUserDTO): Promise<UserModel> {
		return this.usersService.createUser(userData);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Partially update a user by ID' })
	@ApiOkResponse({
		description: 'User updated successfully',
		type: UserModel,
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	async partialUpdateUser(
		@Param(
			'id',
			new ParseUUIDPipe({
				version: '4',
				errorHttpStatusCode: 400,
			}),
		)
		userId: string,
		@Body() userData: UpdateUserDTO,
	): Promise<UserModel> {
		return this.usersService.partialUpdateUser(userId, userData);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete a user by ID' })
	@ApiOkResponse({ description: 'User deleted successfully' })
	@ApiNotFoundResponse({ description: 'User not found' })
	deleteUser(
		@Param(
			'id',
			new ParseUUIDPipe({
				version: '4',
				errorHttpStatusCode: 400,
			}),
		)
		userId: string,
	): Promise<void> {
		return this.usersService.deleteUser(userId);
	}
}
