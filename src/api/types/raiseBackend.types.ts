export interface PresignedUrlResponse {
    url: string;
  }
  
  export interface UploadResponse {
    message: string;
    fileName?: string;
    location?: string; // S3 file URL if returned by backend
  }
  
  export interface UploadStatus {
    [fileName: string]: number; // progress percentage or -1 for failed
  }