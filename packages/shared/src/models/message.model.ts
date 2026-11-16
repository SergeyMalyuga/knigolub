import {Author} from "./author.model.js";

export interface Message {
    id: string;
    text: string;
    createdAt: Date;
    author: Author
}