import { MediaAsset } from "@/types/files";
import getFileExtension from "./get-file-extension";

// Helper to prepare image for form data
export function prepareImageForUpload(image: MediaAsset) {
    // For React Native, we need to create an object with specific properties
    // that FormData can properly handle for file uploads
    return {
        uri: image.uri,
        name: image.fileName || `image.${getFileExtension(image)}`,
        type: `image/${getFileExtension(image)}`,
    };
}