import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadModel {
	@ApiProperty({ description: 'User id' })
	sub: string;

	@ApiProperty({ description: 'User email' })
	email: string;
}
