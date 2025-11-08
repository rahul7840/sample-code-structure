import { Module } from '@nestjs/common';
import { DbConfig } from './database.providers';
import { databaseProviders } from './sequelize.providers';

@Module({
  providers: [
    ...databaseProviders,
    DbConfig
  ],
  exports: [DbConfig, ...databaseProviders],
})
export class DatabaseModule {} 