import { DEFAULT_AVATAR_URL } from "../constants/const";

export function getAbsoluteAvatarUrl(relativePath: string | null | undefined) {
  const baseUrl = process.env.BASE_URL;

  if (!relativePath) {
    return `${baseUrl}${DEFAULT_AVATAR_URL}`;
  }

  if (
    relativePath.startsWith("http://") ||
    relativePath.startsWith("https://")
  ) {
    return relativePath;
  }

  return `${baseUrl}${relativePath}`;
}
