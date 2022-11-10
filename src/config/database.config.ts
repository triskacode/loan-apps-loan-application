import { registerAs } from '@nestjs/config';

export const DatabaseConfig = registerAs('database', () => ({
  name: 'db-loan.sqlite',
}));
