"use client";
import { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import "@/styles/upload.css"

const FileUploadSection = ({ onUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (uploadedFiles) => {
        setUploading(true);
        setError(null);

        try {
            await onUpload(uploadedFiles);
        } catch (uploadError) {
            console.error("File upload error:", uploadError);
            setError("Could not upload file. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
      <div className="flex flex-col items-center space-y-4 mb-8 p-4">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <FileUpload onChange={handleUpload} />
          {error && <p className="text-red-600">{error}</p>}
          {uploading && (
            <div className="w-full flex justify-center items-center">
              <div className="loader">
                <span className="loader-text">uploading</span>
                <span className="load"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default FileUploadSection;
