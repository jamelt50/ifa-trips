import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column,hasOne,HasOne } from '@ioc:Adonis/Lucid/Orm'
import users from './users'
import Trip from './Trip'
import Conversation from './Conversation'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public conversation_id: number;

  @column()
  public from_id: number;

  @hasOne(() => users)
  public from: HasOne<typeof users>


  @hasOne(() => Conversation)
  public conversation: HasOne<typeof Conversation>

  @belongsTo(() => Message)
  public userTwo: BelongsTo<typeof Message>;

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
