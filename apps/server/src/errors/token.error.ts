export class TokenError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "TokenError";
        this.statusCode = 500;
    }
}