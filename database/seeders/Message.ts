import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Message from "App/Models/Message";

export default class extends BaseSeeder {
  public async run() {
   await Message.createMany([
      { from_id: 1, conversation_id: 2, content: "salut commentg ca va" },
      { from_id: 1, conversation_id: 2, content: "salut eaerea" },
      { from_id: 1, conversation_id: 2, content: "saerntg ca va" },
      { from_id: 2, conversation_id: 2, content: "salut comment" },
      { from_id: 1, conversation_id: 2, content: "saluca va" },
      { from_id: 1, conversation_id: 3, content: "salut coma va" },
      { from_id: 3, conversation_id: 3, content: "salut coma va" },
      { from_id: 1, conversation_id: 1, content: "salut commentg ca va" },
      { from_id: 1, conversation_id: 4, content: "salut commentg ca va" },
      { from_id: 2, conversation_id: 2, content: "salut commentg ca va" },
      { from_id: 2, conversation_id: 2, content: "salut commentg ca va" },
      { from_id: 2, conversation_id: 2, content: "salut commentg ca va" },
      { from_id: 1, conversation_id: 2, content: "salut commentg ca va" },
      { from_id: 1, conversation_id: 2, content: "salut commentg ca va" },
      { from_id: 4, conversation_id: 2, content: "salut eaerea" },
      { from_id: 1, conversation_id: 2, content: "saerntg ca va" },
      { from_id: 3, conversation_id: 2, content: "salut comment" },
      { from_id: 1, conversation_id: 2, content: "saluca va" },
      { from_id: 2, conversation_id: 3, content: "salut coma va" },
      { from_id: 3, conversation_id: 3, content: "salut coma va" },
      { from_id: 1, conversation_id: 4, content: "salut commentg ca va" },
      { from_id: 1, conversation_id: 4, content: "salut commentg ca va" },
      { from_id: 2, conversation_id: 2, content: "salut  va" },
      { from_id: 2, conversation_id: 2, content: "salut commentg ca va" },
      { from_id: 2, conversation_id: 4, content: "salut commentg ca va" },
      { from_id: 1, conversation_id: 1, content: "salut coma va" },
    ]);
  }
}
