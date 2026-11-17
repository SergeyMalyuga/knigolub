export class AuthSocketError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "SocketAuthError";
        this.statusCode = 401;
    }
}