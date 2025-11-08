import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CommunityItem } from './communities-item-model';

@Table({
  schema: 'public',
  tableName: 'market',
  timestamps: true, // because you have created_at & updated_at
})
export class MarketModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  market_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  post_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  category_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  mobile_number: string;

  @ForeignKey(() => CommunityItem)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  community_item_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;
}
