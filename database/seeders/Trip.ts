import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Trip from 'App/Models/Trip'
import users from 'App/Models/users'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run () {
    await Trip.createMany([
      {
        from_city_id: 1,
        to_city_id: 2,
        seats: 4,
        trip_time:"01:00",
        driver_id: new users({email:}),
        price:30
      },
      {
        from_city_id: 2,
        to_city_id: 3,
        seats: 3,
        trip_time:"01:00",
        driver_id:1,
        price:40
      },
      {
        from_city_id: 1,
        to_city_id: 2,
        seats: 1,
        trip_time:"01:00",
        driver_id:1,
        price:10
      },


    ])
  }
}
