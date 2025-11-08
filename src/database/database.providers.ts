import { Injectable, Inject } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class DbConfig {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async queryHandler(
    query: string,
    params?: any[],
    transaction?: any,
  ): Promise<any> {
    try {
      const result = await this.sequelize.query(query, {
        bind: params || [],
        type: QueryTypes.RAW,
        transaction,
      });
      console.log(`Query executed successfully: ${query}`, params);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      return Promise.reject(error.message || error);
    }
  }

  async queryHandlerWithoutTransaction(
    query: string,
    params?: any[],
  ): Promise<any> {
    try {
      const result = await this.sequelize.query(query, {
        bind: params || [],
        type: QueryTypes.RAW,
      });
      console.log(`Query executed successfully: ${query}`, params);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      return Promise.reject(error.message || error);
    }
  }
  async queryHandlerSelect(
    query: string,
    params?: any[],
    transaction?: any,
  ): Promise<any> {
    try {
      await this.sequelize.query("SET timezone = 'Asia/Kolkata'");
      const result = await this.sequelize.query(query, {
        bind: params || [],
        type: QueryTypes.SELECT,
        transaction,
      });
      console.log(`Query executed successfully: ${query}`, params);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      return Promise.reject(error.message || error);
    }
  }
}
