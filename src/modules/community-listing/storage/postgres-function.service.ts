import { Injectable } from '@nestjs/common';
import { DbConfig } from 'src/database/database.providers';

@Injectable()
export class PostgresFunctionService {
  constructor(private readonly dbConfig: DbConfig) {}
}
