import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import requestIp from 'request-ip';

import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(helmet());
  app.use(compression());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 500,
      message: 'Too many requests from this IP address, please try again later',
      keyGenerator: (req) => requestIp.getClientIp(req),
    }),
  );

  const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message:
      'Too many accounts created from this IP address, please try again after an hour',
    keyGenerator: (req) => requestIp.getClientIp(req),
  });
  app.use('/auth/signup', signupLimiter);

  await app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
}

bootstrap();
