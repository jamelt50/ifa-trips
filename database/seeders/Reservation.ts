import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Reservation from "App/Models/Reservation";
import Trip from "App/Models/Trip";
import users from "App/Models/users";

export default class extends BaseSeeder {
  public async run() {
    const user1 = await users.find("1");
    const user2 = await users.find("2");
    const user3 = await users.find("3");
    const user4 = await users.find("4");

    const trip1 = await Trip.find("1");
    const trip2 = await Trip.find("2");
    const trip3 = await Trip.find("3");
    const trip4 = await Trip.find("4");

   await Reservation.createMany([
      {
        passenger_id: 1,
        trip_id: 1,
        state: 'pending'
      },
      {
        passenger_id: 2,
        trip_id: 1,
        state: 'canceled'
      },
      {
        passenger_id: 3,
        trip_id: 2,
        state: 'accepted'
      },
      {
        passenger_id: 4,
        trip_id: 2,
        state: 'pending'
      },
      {
        passenger_id: 1,
        trip_id: 3,
        state: 'accepted'
      },
      {
        passenger_id: 1,
        trip_id: 2,
        state: 'pending'
      },
      {
        passenger_id: 2,
        trip_id: 3,
        state: 'pending'
      },
      {
        passenger_id: 1,
        trip_id: 4,
        state: 'accepted'
      },
      {
        passenger_id: 4,
        trip_id: 1,
        state: 'pending'
      },
      {
        passenger_id:2,
        trip_id: 4,
        state: 'accepted'
      },
    ]);
  }
}
