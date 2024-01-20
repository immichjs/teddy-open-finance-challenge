import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
	@Inject() private readonly authenticationService: AuthenticationService;

	@Post('login')
	async login(@Body() loginDTO: LoginDTO) {
		return this.authenticationService.login(loginDTO);
	}
}
