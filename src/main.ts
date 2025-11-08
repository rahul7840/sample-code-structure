import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply CORS
  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle('Community Platform API')
    .setDescription('API documentation for the Community Platform module')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Listen on port 6066
  await app.listen(6066);

  console.log(`http://localhost:6066/api`);
}
bootstrap();
