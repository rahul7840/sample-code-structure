import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserProfileModel } from './users-model';
import { CommunityModel } from './communities-mode';
import { RoleModel } from './role-model';

export enum approve_status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

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
    autoIncrement: true,
  })
  mapping_id: number;

  @ForeignKey(() => CommunityModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  community_id: number;

  @ForeignKey(() => UserProfileModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  user_id: number;

  @Column({
    type: DataType.ENUM(...Object.values(approve_status)),
    allowNull: true,
  })
  approve_status: approve_status;

  @ForeignKey(() => RoleModel)
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

  @BelongsTo(() => RoleModel)
  role: RoleModel;

  @BelongsTo(() => CommunityModel)
  community: CommunityModel;

  @BelongsTo(() => UserProfileModel)
  userProfile: UserProfileModel;
}
