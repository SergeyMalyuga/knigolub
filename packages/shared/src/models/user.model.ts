export interface User {
  id: string;
  email: string;
  username: string
  avatar: string | null;
  registrationAt: number;
  reviews?: number; //TODO убрать из модели
}
