export enum UserErrorField {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
}

export const CHAT_STATUS_CONFIG = {
  OFFLINE: { value: 'offline', label: 'Оффлайн' },
  ONLINE:  { value: 'online',  label: 'Онлайн'  },
  AWAY:  { value: 'away',  label: 'Отошёл'  },
} as const;

export const CHAT_STATUS = typeof CHAT_STATUS_CONFIG;
