export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  registrationAt: number;
  reviews: number;
}
