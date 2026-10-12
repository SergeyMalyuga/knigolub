import {User} from "./user.model";

export interface UserDto {
    user: User,
    token: string,
}