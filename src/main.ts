import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
 // check NODE_ENV
 if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'dev';
 } else if (process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'dev') {
  throw new Error('[NEST] NODE_ENV must be either prod or dev');
 }

 // log PORT and mode
 Logger.log(`Running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`, 'Bootsrap');

 // create app
 const app = await NestFactory.create(AppModule);

 // swagger
 const config = new DocumentBuilder()
  .setTitle('Server API')
  .setDescription('RESTFUL Backend server')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

 // error handling
 useContainer(app.select(AppModule), { fallbackOnErrors: true });
 // validation
 app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

 await app.listen(process.env.PORT);
}
bootstrap();
