import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/UserEntity';
import { JwtPayloadModel } from './model/JwtPayloadModel';
import { AccessTokenModel } from './model/AccessTokenModel';
import { UserModel } from '../users/model/UserModel';

@Injectable()
export class AuthenticationService {
	@Inject() private readonly usersService: UsersService;
	@Inject() private readonly jwtService: JwtService;

	async validateUser({ email, password }: LoginDTO): Promise<UserEntity> {
		const user = await this.usersService.findUserByEmail(email);

		if (!user) {
			throw new UnauthorizedException('User not found.');
		}

		const passwordValid = await compare(password, user.password);

		if (!passwordValid) {
			throw new UnauthorizedException('Incorrect password');
		}

		user.password = undefined;

		return user;
	}

	async login(loginDTO: LoginDTO): Promise<AccessTokenModel> {
		const user = await this.validateUser(loginDTO);
		const { accessToken } = this.createAccessToken(user);

		return {
			accessToken,
		};
	}

	createAccessToken(user: UserEntity): AccessTokenModel {
		const payload: JwtPayloadModel = { sub: user.id, email: user.email };

		return {
			accessToken: this.jwtService.sign(payload),
		};
	}

	async validateAccessToken(token: string): Promise<{ id: string }> {
		try {
			const verifiedData = this.jwtService.verify(token);
			const user = await this.usersService.findUserById(verifiedData.sub);

			return {
				id: user.id,
			};
		} catch (error) {
			return null;
		}
	}
}
