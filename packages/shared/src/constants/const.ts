export enum UserErrorField {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
}

export const CHAT_STATUS_CONFIG = {
  OFFLINE: { value: "offline", label: "Оффлайн" },
  ONLINE: { value: "online", label: "Онлайн" },
  AWAY: { value: "away", label: "Отошёл" },
} as const;

export const SOCKET_CLIENT_EVENTS = {
  JOIN_CHAT: "client:join_chat",
  LEAVE_CHAT: "client:leave_chat",
  SEND_MESSAGE: "client:send_message",
} as const;

export const SOCKET_SERVER_EVENTS = {
  NEW_MESSAGE: "server:new_message",
  ERROR: "server:error",
} as const;
