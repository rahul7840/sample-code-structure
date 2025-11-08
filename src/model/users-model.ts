import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  Default,
  AutoIncrement,
} from 'sequelize-typescript';
import { JobTitleModel } from './job-title-model';
// import { UserModel } from './user.model';

@Table({
  schema: 'public',
  tableName: 'users',
  timestamps: true,
})
export class UserProfileModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
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
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_super_admin: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

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
