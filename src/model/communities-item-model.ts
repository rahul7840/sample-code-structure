import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { UserProfileModel } from './users-model';
import { CommunityModel } from './communities-mode';

export enum ItemTypeEnum {
  POST = 'POST',
  EVENT = 'EVENT',
  PRODUCT = 'PRODUCT',
  // 👆 Add more as per your DB enum definition
}

@Table({
  tableName: 'community_item',
  timestamps: true,
})
export class CommunityItem extends Model<CommunityItem> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  community_item_id: number;

  @ForeignKey(() => CommunityModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  community_id: number;

  @Column({
    type: DataType.ENUM(...Object.values(ItemTypeEnum)),
    allowNull: false,
  })
  item_type_enum: ItemTypeEnum;

  @ForeignKey(() => UserProfileModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_approved: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updated_at: Date;

  // Associations
  @BelongsTo(() => CommunityModel)
  community: CommunityModel;

  @BelongsTo(() => UserProfileModel)
  user: UserProfileModel;
}
