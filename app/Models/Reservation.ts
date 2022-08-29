import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column,hasOne,HasOne } from '@ioc:Adonis/Lucid/Orm'
import users from './users'
import Trip from './Trip'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public passenger_id: number
  @column()
  public trip_id: number

  @belongsTo(() => users,{localKey:"id",foreignKey:"passenger_id"})
  public passenger: BelongsTo<typeof users>

  @belongsTo(() => Trip,{localKey:"id",foreignKey:"trip_id"})
  public trip: BelongsTo<typeof Trip>

  @column()
  public state:string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
