import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Trip from "./Trip";

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public code: string;

  @column()
  public code_departement: string;

  @column()
  public codes_postaux: string;

  @column()
  public code_region: string;

  @column()
  public population: number;
  @hasMany(() => Trip, {
    localKey: "code", // defaults to id
  })
  public profile: HasMany<typeof Trip>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
