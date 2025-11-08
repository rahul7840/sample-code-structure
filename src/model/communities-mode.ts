import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
  schema: 'public',
  tableName: 'communities', // ← replace with your actual table name
  timestamps: true,
})
export class CommunityModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  community_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  media_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  locality_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  category_id: number;

  @Column({
    type: DataType.ENUM('active', 'inactive', 'pending'), // ← replace with your actual enum values
    allowNull: true,
  })
  status_enum: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  manager_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  community_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  community_description: string;
  s;

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
