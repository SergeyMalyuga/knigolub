import type { JsonValue } from "@prisma/client/runtime/client";

export interface BookForMapping {
  id: string;
  googleId: string | null;
  title: string;
  authors: JsonValue;
  description: string | null;
  thumbnail: string | null;
  pageCount: number | null;
  categories: JsonValue;
}
