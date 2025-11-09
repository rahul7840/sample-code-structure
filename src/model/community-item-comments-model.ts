import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { CommunityItem } from './communities-item-model';
import { UserProfileModel } from './users-model';

@Table({
  tableName: 'community_item_comments',
  timestamps: true,
})
export class CommunityItemComment extends Model<CommunityItemComment> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  community_item_comment_id: number;

  @ForeignKey(() => CommunityItem)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  community_item_id: number;

  @ForeignKey(() => UserProfileModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;

  // Associations
  @BelongsTo(() => CommunityItem)
  community_item: CommunityItem;

  @BelongsTo(() => UserProfileModel)
  user: UserProfileModel;
}