import { UserErrorField } from "../constants/const";

export interface ErrorResponse {
  message: string;
  field?: UserErrorField;
  code?: number;
}
