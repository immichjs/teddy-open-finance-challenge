import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/UserEntity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserModel } from './model/UserModel';
import { UtilsService } from 'src/shared/services/utils/utils.service';

@Injectable()
export class UsersService {
	@InjectRepository(UserEntity)
	private readonly userRepository: Repository<UserEntity>;

	@Inject() private readonly utilsService: UtilsService;

	async findAllUsers(): Promise<UserEntity[]> {
		const users = await this.userRepository.find({
			select: [
				'id',
				'name',
				'email',
				'createdAt',
				'updatedAt',
				'shortenedLinks',
			],
			relations: ['shortenedLinks'],
		});

		return users;
	}

	async findUserById(userId: string): Promise<UserModel> {
		const user = await this.userRepository.findOne({
			where: {
				id: userId,
			},
			select: [
				'id',
				'name',
				'email',
				'createdAt',
				'updatedAt',
				'shortenedLinks',
			],
			relations: ['shortenedLinks'],
		});

		if (!user) {
			throw new NotFoundException(`User not found`);
		}

		return {
			...user,
			_links: this.utilsService.mountLinks(userId, 'users'),
		};
	}

	async findUserByEmail(email: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: {
				email,
			},
		});

		return user;
	}

	async createUser({
		name,
		email,
		password,
	}: CreateUserDTO): Promise<UserModel> {
		const hashPassword = await this.utilsService.encryptData(password);

		const user = this.userRepository.create({
			name,
			email,
			password: hashPassword,
		});

		const savedUser = await this.userRepository.save(user);
		savedUser.password = undefined;

		return {
			...savedUser,
			_links: this.utilsService.mountLinks(savedUser.id, 'users'),
		};
	}

	async partialUpdateUser(
		userId: string,
		{ name, email, password }: UpdateUserDTO,
	): Promise<UserModel> {
		const user = await this.findUserById(userId);

		if (name) {
			user.name = name;
		}

		if (email) {
			user.email = email;
		}

		if (password) {
			const hashPassword = await this.utilsService.encryptData(password);
			user.password = hashPassword;
		}

		const savedUser = await this.userRepository.save(user);
		savedUser.password = undefined;

		return {
			...savedUser,
			_links: this.utilsService.mountLinks(savedUser.id, 'users'),
		};
	}

	async deleteUser(userId: string): Promise<void> {
		const userToDelete = await this.userRepository.findOne({
			where: {
				id: userId,
			},
		});

		if (!userToDelete) {
			throw new NotFoundException(`User not found`);
		}

		await this.userRepository.delete(userId);
	}
}
