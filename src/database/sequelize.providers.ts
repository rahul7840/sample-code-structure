import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
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
            rejectUnauthorized: false,
          },
          statement_timeout: 30000,
          idle_in_transaction_session_timeout: 20000,
        },
        models: [],
        define: {
          freezeTableName: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
        logging: false,
        pool: {
          max: 100,
          min: 5,
          acquire: 30000,
          idle: 10000,
          evict: 1000,
          maxUses: 7500,
        },
      });

      await sequelize.authenticate();

      return sequelize;
    },
  },
];
