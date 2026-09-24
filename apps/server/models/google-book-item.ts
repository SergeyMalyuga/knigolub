import type { GoogleBookVolumeInfo } from "./google-book-volume-info";

export interface GoogleBookItem {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
}
