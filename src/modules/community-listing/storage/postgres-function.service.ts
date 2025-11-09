import { Injectable } from '@nestjs/common';
import { DbConfig } from 'src/database/database.providers';
import { DbFunction } from 'src/database/db-function-queries';

@Injectable()
export class PostgresFunctionService {
  constructor(private readonly dbConfig: DbConfig) {}

  async getAll(paramArray: any[]): Promise<any> {
    return this.dbConfig.queryHandlerSelect(
      DbFunction.listing.check_listing,
      paramArray,
    );
  }

  async getAllCount(paramArray: any[]): Promise<any> {
    return this.dbConfig.queryHandlerSelect(
      DbFunction.listing.check_listing_count,
      paramArray,
    );
  }
}
