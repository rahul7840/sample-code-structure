import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
  schema: 'public',
  tableName: 'job_titles', // ← change this to your actual table name
  timestamps: true,
})
export class JobTitleModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  job_title_id: number;

 
   @Column({
     type: DataType.STRING,
     allowNull: true,
   })
   job_title: string;
}