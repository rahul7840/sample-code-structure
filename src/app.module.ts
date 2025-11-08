import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

      SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.db_host,
      port: Number(process.env.db_port),
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_name,
      timezone: '+05:30',
      dialectOptions: {
        ssl: {
        require: true,
        rejectUnauthorized: false, // important for DigitalOcean
      },
        statement_timeout: 30000,
        idle_in_transaction_session_timeout: 20000,
      },
      models: [
      ],
      synchronize: false,
      autoLoadModels: true,
      define: {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      logging: false,
      pool: {
        max: 50,
        min: 3,
        acquire: 30000,
        idle: 10000,
        evict: 1000,
        maxUses: 7500,
      },
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
