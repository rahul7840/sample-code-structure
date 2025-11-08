import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
  schema: 'public',
  tableName: 'media',
  timestamps: true, // since you have created_at & updated_at
})
export class MediaModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  media_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  size: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  file_path: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  original_file_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  mimetype: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  file_name: string;

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
