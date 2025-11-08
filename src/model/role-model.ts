import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  schema: 'public',
  tableName: 'role',
  timestamps: true, // you have created_at & updated_at columns
})
export class RoleModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  role_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  role_name: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;
}
