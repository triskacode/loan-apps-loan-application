import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  httpPort: process.env.HTTP_PORT || 4003,
  microservicePort: process.env.MICROSERVICE_PORT || 10003,
  cors: {
    origin: true,
    credentials: true,
  },
}));
