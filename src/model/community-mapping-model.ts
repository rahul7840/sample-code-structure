import { Model } from 'sequelize';
import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  schema: 'public',
  tableName: 'user_community_mapping',
  timestamps: true, // since you have created_at & updated_at
})
export class UserCommunityMappingModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  mapping_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  community_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  user_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  role_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_approved: boolean;

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
