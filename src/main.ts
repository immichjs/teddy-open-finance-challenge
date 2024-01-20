import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 3000;
	const config = new DocumentBuilder()
		.setTitle('Encurtador de URLs')
		.setDescription('API para encurtar links.')
		.setVersion('1.0')
		.build();

	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(port);
}
bootstrap();
