import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'nearby_localities',
  timestamps: true,
})
export class NearbyLocalityModel extends Model<NearbyLocalityModel> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  source_locality_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  source_locality: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  locality_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  locality: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
