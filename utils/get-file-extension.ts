import { MediaAsset } from "@/types/files";

export default function getFileExtension(file: MediaAsset): string {
  let fileExtension = 'jpg'; // Default fallback
  if (file.fileName) {
    const parts = file.fileName.split('.');
    if (parts.length > 1) {
      fileExtension = parts[parts.length - 1];
    }
  } else if (file.uri) {
    const parts = file.uri.split('.');
    if (parts.length > 1) {
      fileExtension = parts[parts.length - 1];
    }
  }
  return fileExtension;
}