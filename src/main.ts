import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuditLogInterceptor } from './shared/interceptors/audit-log.interceptor';
import { AuditLogFacade } from './interfaces/http/audit-log/audit-log.facade';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // 🔀 Cek apakah instance ini dijalankan sebagai worker (ERP scheduler)
  if (process.env.ENABLE_ERP_SCHEDULER === 'true') {
    logger.log('🚧 Mode worker aktif — hanya menjalankan ERP Scheduler, tanpa web server.');

    // Import ERP Scheduler secara dinamis
    const { ErpSchedulerService } = await import('./erp/erp-scheduler.service');

    // Buat instance AppModule supaya dependency injection tetap jalan
    const app = await NestFactory.createApplicationContext(AppModule);

    // Ambil service ERP dari container Nest
    const scheduler = app.get(ErpSchedulerService);

    // Inisialisasi scheduler manual
    await scheduler.onModuleInit();

    logger.log('✅ ERP Scheduler berjalan.');
    return; // jangan start HTTP server
  }
  
  // 🌐 Mode default: jalankan web server NestJS
  const app = await NestFactory.create(AppModule);

  // ⛑️ Global Interceptor untuk handle serialization (misal @Exclude di entity)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new AuditLogInterceptor(app.get(AuditLogFacade), app.get(Reflector)),);

  // 🍪 Untuk parsing cookie (dibutuhkan kalau pakai refresh token via cookie)
  app.use(cookieParser());

  // 🔐 CORS (sesuaikan jika frontend terpisah)
  app.enableCors({
    origin: 'http://localhost:3001',
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
