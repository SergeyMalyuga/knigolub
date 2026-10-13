import {UserErrorField} from "@knigolub/shared";

export class AuthError extends Error {
    public field: UserErrorField;
    public statusCode: number;

    public constructor(message: string, field: UserErrorField, statusCode: number) {
        super(message);
        this.field = field;
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, AuthError.prototype);
    }
}