import { Server } from "socket.io";
import type { Server as HttpServer } from "node:http";
import { websocketAuth } from "../middleware/websocket-auth";
import {
  type ClientToServerEvents,
  type ServerToClientEvents,
  SOCKET_SERVER_EVENTS,
} from "@knigolub/shared";
import { presenceService } from "./presence.service";
import { UserService } from "./user.service";
import { catchError, filter, from, mergeMap, of } from "rxjs";
import { PRESENCE_TYPE } from "../constants/const";

export class ChatGatewayService {
  private io: Server<ClientToServerEvents, ServerToClientEvents> | null = null;
  private userService = new UserService();

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
    this.subscribePresenceChanged();
    this.setupListeners();
  }

  private setupListeners(): void {
    this.io!.on("connection", async (socket) => {
      console.log(`🔌 Подключен: ${socket.data.user.email} (${socket.id})`);
      const userId = socket.data.user.id as string;

      presenceService.addConnection(userId, socket.id);

      const snapshot = await this.userService.getOnlineUsers(userId);
      socket.emit(SOCKET_SERVER_EVENTS.PRESENCE_SNAPSHOT, snapshot);

      socket.on("disconnect", () =>
        presenceService.removeConnection(userId, socket.id),
      );
    });
  }

  public getIO() {
    if (!this.io) {
      throw new Error("Socket.IO не инициализирован. Вызовите init() сначала.");
    }
    return this.io;
  }

  public subscribePresenceChanged() {
    presenceService.presenceChanged$
      .pipe(
        filter((event) => event.type === PRESENCE_TYPE.ONLINE),
        mergeMap((event) =>
          from(this.userService.getOnlineUserById(event.userId)).pipe(
            catchError(() => of(null)),
          ),
        ),
        filter((user) => user !== null),
      )
      .subscribe((user) =>
        this.io?.emit(SOCKET_SERVER_EVENTS.PRESENCE_ONLINE, user),
      );

    presenceService.presenceChanged$
      .pipe(filter((event) => event.type === PRESENCE_TYPE.OFFLINE))
      .subscribe(({ userId }) =>
        this.io?.emit(SOCKET_SERVER_EVENTS.PRESENCE_OFFLINE, userId),
      );
  }
}

export const chatGateway = new ChatGatewayService();
