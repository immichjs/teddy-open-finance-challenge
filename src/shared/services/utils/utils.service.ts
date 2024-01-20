import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class UtilsService {
	async encryptData(data: string) {
		const SALT = 10;
		const hashed = await hash(data, SALT);

		return hashed;
	}

	mountLinks(id: string, resource: string) {
		const baseURL = process.env.URL;

		const _links = {
			self: {
				href: `${baseURL}/${resource}/${id}`,
				method: 'GET',
			},
			update: {
				href: `${baseURL}/${resource}/${id}`,
				method: 'PATCH',
			},
			delete: {
				href: `${baseURL}/${resource}/${id}`,
				method: 'DELETE',
			},
		};

		return _links;
	}

	generateRandomCode(length: number): string {
		const characters =
			'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		let code = '';

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			code += characters.charAt(randomIndex);
		}

		return code;
	}
}
