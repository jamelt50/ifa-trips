import { Server } from "socket.io";
import AdonisServer from "@ioc:Adonis/Core/Server";
class Ws {
  public io: Server;
  public booted = false;

  public boot() {
    if (this.booted) {
      return;
    }
    this.booted = true;
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: "*",
      },
    });
  }
}

export default new Ws();
