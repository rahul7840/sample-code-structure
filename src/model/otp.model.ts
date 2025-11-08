import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserProfileModel } from './users-model';



@Table({ schema: 'public', tableName: 'otp', timestamps: true })
export class OTPModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  otp_id: number;

  @ForeignKey(() => UserProfileModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  created_for: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  otp: string;


  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_verified: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  valid_till: Date;

  @ForeignKey(() => UserProfileModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  created_by: number;

  @ForeignKey(() => UserProfileModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  updated_by: number;

  @Column({
    type: DataType.DATE,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
  })
  updated_at: Date;


  @BelongsTo(() => UserProfileModel)
  user: UserProfileModel;
}

