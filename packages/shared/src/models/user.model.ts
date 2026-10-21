export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  registrationAt: Date;
  reviews?: number; //TODO убрать из модели
}
