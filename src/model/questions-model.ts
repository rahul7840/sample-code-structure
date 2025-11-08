import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

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
  })
  question_id: number;

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
}
