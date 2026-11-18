import { Server } from "socket.io";
import type { Server as HttpServer } from "node:http";
import { websocketAuth } from "../middleware/websocket-auth";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@knigolub/shared";

export class ChatGatewayService {
  private io: Server<ClientToServerEvents, ServerToClientEvents> | null = null;

  public init(server: HttpServer) {
    if (this.io) {
      console.warn("Socket.IO уже инициализирован!");
      return;
    }

    this.io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
      cors: {
        origin: "http://localhost:4200",
        credentials: true,
      },
    });

    this.io.use(websocketAuth);

    this.setupListeners();
  }

  private setupListeners(): void {
    this.io!.on("connection", (socket) => {
      console.log(`🔌 Подключен: ${socket.data.user.email} (${socket.id})`);
      socket.on("disconnect", () => {
        console.log(`🔌 Отключен: ${socket.data.user.email}`);
      });
    });
  }

  public getIO() {
    if (!this.io) {
      throw new Error("Socket.IO не инициализирован. Вызовите init() сначала.");
    }
    return this.io;
  }
}

export const chatGateway = new ChatGatewayService();
