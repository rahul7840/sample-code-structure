import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { JobTitleModel } from './job-title-model';
// import { UserModel } from './user.model';

@Table({
  schema: 'public',
  tableName: 'user_profiles',
  timestamps: true,
})
export class UserProfileModel extends Model {
  @PrimaryKey
//   @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  user_id: bigint;

//   @ForeignKey(() => JobTitleModel)
  @Column({
    type: DataType.BIGINT,
  })
  job_title_id: bigint;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_manager: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  company_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  interested_categories: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  interested_localities: string;

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

//   // 🔗 Associations
//   @BelongsTo(() => UserModel)
//   user: UserModel;

//   @BelongsTo(() => JobTitleModel)
//   job_title: JobTitleModel;
}
