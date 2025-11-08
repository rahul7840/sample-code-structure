import { Model } from 'sequelize';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  schema: 'public',
  tableName: 'localities', // ← change this to your actual table name
  timestamps: true,
})
export class localitiesModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
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
