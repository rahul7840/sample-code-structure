import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  schema: 'public',
  tableName: 'user_question_answer_mapping',
  timestamps: true, // since you have created_at & updated_at
})
export class UserQuestionAnswerMappingModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
  })
  user_question_answer_mapping_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  question_id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  answer: string;

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
