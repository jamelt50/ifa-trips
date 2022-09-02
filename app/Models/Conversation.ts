import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import users from "./users";
import Message from "./Message";
import Trip from "./Trip";

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_one_id: number;

  @column()
  public user_two_id: number;

  @column()
  public trip_id: number;

  @belongsTo(() => users, {
    foreignKey: "user_one_id",
  })
  public userOne: BelongsTo<typeof users>;
  @belongsTo(() => users, {
    foreignKey: "user_two_id",
  })
  public userTwo: BelongsTo<typeof users>;

  @belongsTo(() => Trip, {
    foreignKey: "trip_id",
  })
  public trip: BelongsTo<typeof Trip>;

  @hasMany(() => Message, { localKey: "id", foreignKey: "conversation_id" })
  public messages: HasMany<typeof Message>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
