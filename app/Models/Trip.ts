import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import users from './users'
import City from './City'
import Reservation from './Reservation'

export default class Trip extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public driver_id: number

  @column()
  public from_city_id: number

  @column()
  public to_city_id: number

  @column()
  public seats: number

  @column()
  public description: string;

  @column()
  public price: number

  @column.dateTime()
  public trip_time: DateTime
  @column.dateTime()
  @column()
  public date: DateTime

  @belongsTo(() => City, {
    foreignKey: 'from_city_id',
    localKey: "code"
  })
  public from: BelongsTo<typeof City>

  @belongsTo(() => City, {
    foreignKey: 'to_city_id',
    localKey: "code" 
  })
  public to: BelongsTo<typeof City>

  @hasMany(() => Reservation)
  public reservation: HasMany<typeof Reservation>


  @belongsTo(() => users, {
    foreignKey: 'driver_id', 
  })
  public driver: BelongsTo<typeof users>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
