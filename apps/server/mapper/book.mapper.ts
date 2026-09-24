import type {Book as PrismaBook} from "../generated/prisma/client";
import type {Book} from "@knigolub/shared/src/models/book";
import type {JsonValue} from "../generated/prisma/internal/prismaNamespace";

export function mapPrismaBookToShared(book: PrismaBook): Book {
    function jsonToStringArray(value: JsonValue): string[] {
        if (Array.isArray(value)) {
            return value.filter((item): item is string => typeof item === 'string');
        }
        return [];
    }

return {
    id: book.id,
    googleId: book.googleId,
    title: book.title,
    authors: jsonToStringArray(book.authors),
    description: book.description,
    thumbnail: book.thumbnail,
    pageCount: book.pageCount,
}
}