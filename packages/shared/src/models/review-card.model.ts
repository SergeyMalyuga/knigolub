import { User } from "./user.model";

export interface ReviewCard {
  id: string;
  comment: string;
  owner: User;
}
