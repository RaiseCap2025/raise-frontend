import axios from 'axios';
import type { UploadResponse, PresignedUrlResponse } from '../types/raiseBackend.types';

const BASE_URL = '/api'; // Adjust if needed

export const RaiseBackendAPI = {
  /**
   * Get a presigned URL for S3 upload
   */
  getPresignedUrl: async (fileName: string): Promise<PresignedUrlResponse> => {
    const response = await axios.get(`${BASE_URL}/s3/presign?fileName=${fileName}`);
    return response.data;
  },

  /**
   * Upload file to backend (Node.js service)
   */
  uploadFile: async (file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) onProgress(percent);
        }
      },
    });

    return response.data;
  },
};