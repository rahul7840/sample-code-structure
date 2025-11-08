import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { CommunityModel } from './communities-mode';
import { UserQuestionAnswerMappingModel } from './que-ans-mapping-model';

@Table({
  schema: 'public',
  tableName: 'questions',
  timestamps: false, // no created_at or updated_at columns
})
export class QuestionModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
  })
  question_id: number;

  @ForeignKey(() => CommunityModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  community_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_mandatory: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  question_description: string;

  @BelongsTo(() => CommunityModel)
  community: CommunityModel;

  @HasOne(() => UserQuestionAnswerMappingModel)
  userQuestionAnswerMapping: UserQuestionAnswerMappingModel;
}
