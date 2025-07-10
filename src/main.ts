import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⛑️ Global Interceptor untuk handle serialization (misal @Exclude di entity)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 🍪 Untuk parsing cookie (dibutuhkan kalau pakai refresh token via cookie)
  app.use(cookieParser());

  // 🔐 CORS (sesuaikan jika frontend terpisah)
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // ⬅️ WAJIB AGAR COOKIE DIKIRIM
  });

  // 📘 Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Sistem Audit Transaksi')
    .setDescription('API untuk sistem audit transaksi internal & ERP')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // 🌐 Ambil PORT dari .env lewat ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
  console.log(`📘 Swagger tersedia di http://localhost:${port}/api-docs`);
}
bootstrap();
