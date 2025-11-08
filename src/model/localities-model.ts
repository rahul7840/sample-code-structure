import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  schema: 'public',
  tableName: 'localities', // ← change this to your actual table name
  timestamps: false,
})
export class LocalitiesModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  locality_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  locality_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city_name: string;
}
