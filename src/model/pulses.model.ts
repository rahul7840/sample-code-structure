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
import { CommunityModel } from './communities-mode';

@Table({
  tableName: 'pulse',
  timestamps: true,
})
export class Pulse extends Model<Pulse> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  pulse_id: number;

  @ForeignKey(() => CommunityModel)
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

  @BelongsTo(() => CommunityModel)
  community_item: CommunityModel;
}
