import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { QuestionModel } from './questions-model';
import { CategoryModel } from './category-model';

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
    autoIncrement: true,
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

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  category_id: number;

  @Column({
    type: DataType.ENUM('ACTIVE', 'INACTIVE', 'PENDING'), // ← replace with your actual enum values
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

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    defaultValue: 0,
  })
  member_count: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    defaultValue: 0,
  })
  post_count: number;

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

  @HasMany(() => QuestionModel)
  questions: QuestionModel[];

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;
}
