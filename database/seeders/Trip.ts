import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Trip from "App/Models/Trip";
import users from "App/Models/users";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  public async run() {
    const user1 = await users.find("1");
    const user2 = await users.find("2");
    const user3 = await users.find("3");
    const user4 = await users.find("4");

    await Trip.createMany([
      {
        from_city_id: "2A115",
        to_city_id: "09122",
        seats: 4,
        trip_time: DateTime.now(),
        driver_id: user1 ? user1.id : 2,
        price: 30,
        date:DateTime.fromFormat('2022-10-04 13:34:05','YYYY-MM-DD hh:mm:ss'),
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée",
      },
      {
        from_city_id: "09122",
        to_city_id: "2A115",
        seats: 3,
        trip_time: DateTime.now(),
        driver_id: user2 ? user2.id : 2,
        price: 40,
        date:DateTime.fromFormat('2022-10-04 13:34:05','YYYY-MM-DD hh:mm:ss'),
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée",
      },
      {
        from_city_id: "77195",
        to_city_id: "18096",
        seats: 1,
        trip_time: DateTime.now(),
        driver_id: user3 ? user3.id : 2,
        price: 14,
        date:DateTime.fromFormat('2022-10-04 13:34:05','YYYY-MM-DD hh:mm:ss'),
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée",
      },
      {
        from_city_id: "2A115",
        to_city_id: "18096",
        seats: 1,
        trip_time: DateTime.now(),
        driver_id: user4 ? user4.id : 2,
        price: 13,
        date:DateTime.fromFormat('2022-10-04 13:34:05','YYYY-MM-DD hh:mm:ss'),
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée",
      },
      {
        from_city_id: "77195",
        to_city_id: "2A115",
        seats: 4,
        trip_time: DateTime.now(),
        driver_id: user1 ? user1.id : 2,
        price: 30,
        date:DateTime.fromFormat('2022-10-04 13:34:05','YYYY-MM-DD hh:mm:ss'),
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée",
      },
      {
        from_city_id: "2A115",
        to_city_id:  "77195",
        seats: 3,
        trip_time: DateTime.now(),
        driver_id: user2 ? user2.id : 2,
        price: 40,
        date:DateTime.fromFormat('2022-10-04 13:34:05','YYYY-MM-DD hh:mm:ss'),
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée",
      },
      {
        from_city_id: "2A115",
        to_city_id:  "77195",
        seats: 1,
        trip_time: DateTime.now(),
        driver_id: user3 ? user3.id : 2,
        price: 14,
        date:DateTime.fromFormat('2022-10-04 13:34:05','YYYY-MM-DD hh:mm:ss'),
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée",
      },
      {
        from_city_id: "18096",
        to_city_id:  "77195",
        seats: 1,
        trip_time: DateTime.now(),
        driver_id: user4 ? user4.id : 2,
        price: 13,
        date:DateTime.fromFormat('2022-10-04 13:34:05','YYYY-MM-DD hh:mm:ss'),
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée",
      },
    ]);
  }
}
