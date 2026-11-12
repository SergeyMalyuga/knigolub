import {ChatStatus} from "../types/chat-status.type";

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  birthday: Date | null;
  avatarUrl: string | null;
  registrationAt: Date;
  chatStatus: ChatStatus;
  reviews?: number; //TODO убрать из модели
}
