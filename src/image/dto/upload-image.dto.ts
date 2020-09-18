export class UploadImageDto {
  originalname: string;
  encoding: string;
  mimetype: string;
  original: {
    ACL: string;
    Location: string;
    key: string;
    Key: string;
    Bucket: string;
    format: string;
    width: number;
    height: number;
    channels: number;
    premultiplied: false;
    size: number;
    ContentType: string;
    mimetype: string;
  };
  thumb: {
    ACL: string;
    ETag: string;
    Location: string;
    key: string;
    Key: string;
    Bucket: string;
    width: number;
    height: number;
    format: string;
    channels: number;
    premultiplied: false;
    size: number;
    ContentType: string;
    mimetype: string;
  };
}
