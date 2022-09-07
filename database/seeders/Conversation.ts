import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Conversation from "App/Models/Conversation";
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
    Conversation.createMany([
      {
        user_one_id: user1 ? user1.id : 1,
        user_two_id: user2 ? user2.id : 2,
        trip_id: trip1 ? trip1.id : 1,
      },
      {
        user_one_id: user1 ? user1.id : 1,
        user_two_id: user2 ? user2.id : 2,
        trip_id: trip1 ? trip1.id : 1,
      },
      {
        user_one_id: user2 ? user2.id : 1,
        user_two_id: user3 ? user3.id : 2,
        trip_id: trip2 ? trip2.id : 1,
      },
      {
        user_one_id: user4 ? user4.id : 1,
        user_two_id: user1 ? user1.id : 2,
        trip_id: trip1 ? trip1.id : 1,
      },
    ]);
  }
}
