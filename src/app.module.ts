import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { MicroserviceConfig } from './config/microservice.config';
import { AuthModule } from './modules/auth/auth.module';
import { LoanModule } from './modules/loan/loan.module';
import { AccountModule } from './modules/account/account.module';
import { PrivateUserModule } from './modules/private-user/private-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, MicroserviceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get('database.name'),
        autoLoadEntities: true,
        logger: 'advanced-console',
        synchronize: true,
        logging: true,
      }),
    }),
    LoanModule,
    AuthModule,
    AccountModule,
    PrivateUserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
