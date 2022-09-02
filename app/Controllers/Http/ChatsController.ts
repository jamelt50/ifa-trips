import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Conversation from "App/Models/Conversation";
import Message from "App/Models/Message";
import Trip from "App/Models/Trip";
import Ws from "App/Services/Ws";
export default class ChatsController {
  public async list({ auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const conversations = await Conversation.query()
      .where("user_one_id", user.id)
      .orWhere("user_two_id", user.id)
      .preload("userOne")
      .preload("userTwo")
      .preload("messages");
    return conversations;
  }

  public async create({ request, auth }: HttpContextContract) {
    const userFrom = await auth.authenticate();

    const validations = await schema.create({
      trip_id: schema.number(),
      message: schema.string(),
    });
    const data = await request.validate({ schema: validations });

    const trip = await Trip.find(data.trip_id);
    if (trip) {
      const conversation = await Conversation.create({
        user_one_id: trip.driver_id,
        user_two_id: userFrom.id,
        trip_id: trip.id,
      });
      const message = await Message.create({
        from_id: userFrom.id,
        conversation_id: conversation.id,
        content: data.message,
      });
      await conversation.load("userOne");
      await conversation.load("userOne");
      await conversation.load("userTwo");

      Ws.io
        .in(trip.driver_id.toString())
        .emit("new-conversation", conversation);
    }
  }
  public async join({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate();
    const validations = await schema.create({
      rooms: schema.array().members(schema.number()),
      socket: schema.string(),
    });
    const data = await request.validate({ schema: validations });
    Ws.io.in(data.socket).socketsJoin(user.id.toString());
    if (data.rooms.length) {
      data.rooms.forEach(async (room) => {
        const conversation = await Conversation.find(room);
        if (conversation) {
          Ws.io.in(data.socket).socketsJoin(room.toString());
        }
      });
    }
  }
}
