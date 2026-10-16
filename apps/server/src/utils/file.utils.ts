// packages/server/src/utils/file.utils.ts
import fs from "fs";
import path from "path";

// Базовая директория public
const PUBLIC_DIR = path.join(__dirname, "../../public");

/**
 * Безопасно удаляет файл по относительному пути.
 * @param relativePath - Путь вида '/uploads/avatars/avatar-123.jpg'
 */
export function deleteFileSafely(
  relativePath: string | null | undefined,
): void {
  // 1. Если пути нет, ничего не делаем
  if (!relativePath) {
    return;
  }

  // 2. ЗАЩИТА: Запрещаем пути, содержащие '..' (защита от выхода за пределы папки public)
  if (relativePath.includes("..")) {
    console.error(
      `[Security] Попытка удаления файла за пределами public: ${relativePath}`,
    );
    return;
  }

  // 3. Формируем абсолютный путь к файлу
  const absolutePath = path.join(PUBLIC_DIR, relativePath);

  // 4. Проверяем существование и удаляем
  if (fs.existsSync(absolutePath)) {
    try {
      fs.unlinkSync(absolutePath);
    } catch (error) {
      console.error(
        `[File Utils] Ошибка при удалении файла ${relativePath}:`,
        error,
      );
    }
  }
}
