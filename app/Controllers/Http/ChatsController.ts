import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Conversation from "App/Models/Conversation";
import Message from "App/Models/Message";
import Trip from "App/Models/Trip";
import Ws from "App/Services/Ws";
export default class ChatsController {
  public async list({ auth }: HttpContextContract) {
    const user = await auth.authenticate();
    let conversations = await Conversation.query()
      .where("user_one_id", user.id)
      .orWhere("user_two_id", user.id)
      .preload("userOne")
      .preload("userTwo")
      .preload("messages", (message) => {
        message.orderBy("created_at", "asc");
      });

    conversations = conversations.sort((a, b) => {
      if (a.messages.length && b.messages.length) {
        if (a.messages[0].createdAt < b.messages[0].createdAt) {
          return -1;
        }
        if (a.messages[0].createdAt > b.messages[0].createdAt) {
          return 1;
        }
        return 0;
      } else if (a.messages.length && !b.messages.length) {
        return -1;
      } else {
        return 1;
      }
    });

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

    if (trip && trip.driver_id != userFrom.id) {
      const conversation = await Conversation.create({
        user_one_id: trip.driver_id,
        user_two_id: userFrom.id,
        trip_id: trip.id,
      });
     await conversation.related("messages").create({
        from_id: userFrom.id,
        conversation_id: conversation.id,
        content: data.message,
      });
      await conversation.load("userOne");
      await conversation.load("userTwo");
      await conversation.load("messages");


      Ws.io
        .in(conversation.userOne.id.toString() + conversation.userOne.email)
        .in(conversation.userTwo.id.toString() + conversation.userTwo.email)
        .emit("new-conversation", conversation);
    }
  }
  public async join({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate();
    const validations = await schema.create({
      rooms: schema.array().members(schema.string()),
      socket: schema.string(),
    });
    const data = await request.validate({ schema: validations });
    Ws.io.in(data.socket).socketsJoin(user.id.toString() + user.email);
    if (data.rooms.length) {
      data.rooms.forEach(async (room) => {
        const conversation = await Conversation.find(room);
        if (conversation) {
          Ws.io.in(data.socket).socketsJoin(room.toString());
        }
      });
    }
  }
  public async send({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate();
    const validations = await schema.create({
      room: schema.number(),
      message: schema.string(),
    });
    const data = await request.validate({ schema: validations });
    const conversation = await Conversation.find(data.room);

    const message = await Message.create({
      from_id: user.id,
      conversation_id: data.room,
      content: data.message,
    });
    Ws.io.in(data.room.toString()).emit("new-message", message);

    response.send(401);
  }
}
