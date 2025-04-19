export type MediaAsset = {
    assetId: string;
    base64: string | null;
    duration: number | null;
    exif: any | null;
    fileName: string;
    fileSize: number;
    height: number;
    type: 'image' | 'video'; // assuming it could also be 'video'
    uri: string;
    width: number;
};
