import { DateTime } from 'luxon'
import { BaseModel, column,hasOne,HasOne } from '@ioc:Adonis/Lucid/Orm'
import users from './users'
import Trip from './Trip'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => users)
  public passenger_id: HasOne<typeof users>

  @hasOne(() => Trip)
  public trip_id: HasOne<typeof Trip>

  @column()
  public state:string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
