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
import { MediaModel } from './media-model';
import { Pulse } from './pulses.model';

@Table({
  tableName: 'pulse_media',
  timestamps: true,
})
export class PulseMedia extends Model<PulseMedia> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pulse_media_id: number;

  @ForeignKey(() => Pulse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pulse_id: number;

  @ForeignKey(() => MediaModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  media_id: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;

  // Associations
  @BelongsTo(() => Pulse)
  pulse: Pulse;

  @BelongsTo(() => MediaModel)
  media: MediaModel;
}