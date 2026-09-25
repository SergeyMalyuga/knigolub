import type { JsonValue } from "../../generated/prisma/internal/prismaNamespace";

export function jsonToStringArray(value: JsonValue): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}
