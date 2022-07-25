import { DateTime } from 'luxon'
import { BaseModel, column,hasOne,HasOne } from '@ioc:Adonis/Lucid/Orm'
import users from './users'

export default class Trip extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public from_city_id: number

  @column()
  public to_city_id: number

  @column()
  public seats: number

  @column()
  public price: number

  @column()
  public trip_time: string

  @column()
  public date: DateTime

  @hasOne(() => users)
  public driver_id: HasOne<typeof users>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
