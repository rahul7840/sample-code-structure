import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
  schema: 'public',
  tableName: 'category', // ← replace with your actual table name
  timestamps: true,
})
export class CategoryModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  category_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category_name: string;
}
