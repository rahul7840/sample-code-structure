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
import { CommunityModel } from './communities-mode';
import { CommunityItem } from './communities-item-model';

@Table({
  tableName: 'pulse',
  timestamps: true,
})
export class Pulse extends Model<Pulse> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  pulse_id: number;

  @ForeignKey(() => CommunityItem)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  community_item_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

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

  @BelongsTo(() => CommunityItem)
  community_item: CommunityItem;
}
