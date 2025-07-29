export const uploadImageToCloudinary = async (file) => {
  // Cloudinary configuration from environment variables
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

  // Check if Cloudinary is properly configured
  if (cloudName === 'your_cloud_name' || uploadPreset === 'your_upload_preset') {
    console.warn('Cloudinary not configured. Please set REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET in your .env file');
    throw new Error('Cloudinary configuration missing');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};
