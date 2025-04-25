import axios from "axios";

export const cloudinaryUpload = async (file) => {
  const url = process.env.REACT_APP_CLOUDINARY_URL; // Use Cloudinary URL from environment variable
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET; // Use Upload Preset from environment variable

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset); // Fix key here

  try {
    const response = await axios.post(url, formData);
    return response.data.secure_url; // This is the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
