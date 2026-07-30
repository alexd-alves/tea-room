import React, { useState } from 'react';

const { URL } = require('../../config.js');

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
    setProgress(0);
    setUploadedUrl('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus('Select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('Uploading...');
      setProgress(0);

      const res = await fetch(`${URL}/api/upload`, {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      setStatus('Uploaded successfully.');
      setUploadedUrl(res.publicUrl);
    } catch (err) {
      console.error(err);
      setStatus('Upload failed.');
    }
  };

  return (
    <div>
      <h3>Upload a File</h3>
      <input type="file" onChange={handleFileChange} />
      <br />
      <br />
      <button type="button" onClick={handleUpload} disabled={!file}>
        Upload
      </button>

      {progress > 0 && (
        <div>
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}

      {status && <p>{status}</p>}

      {uploadedUrl && (
        <div>
          <p>URL:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
