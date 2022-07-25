import { DateTime } from 'luxon'
import { BaseModel, column,hasOne,HasOne } from '@ioc:Adonis/Lucid/Orm'
import users from './users'
import Trip from './Trip'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => users)
  public from_id: HasOne<typeof users>

  @hasOne(() => users)
  public to_id: HasOne<typeof users>

  @hasOne(() => Trip)
  public trip_id: HasOne<typeof Trip>

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
