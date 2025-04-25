// src/utils/cloudinary.js
import axios from "axios";

export const cloudinaryUpload = async (file) => {
  const url = "https://api.cloudinary.com/v1_1/dmu7j8wov/image/upload"; // replace with your Cloudinary Cloud Name
  const uploadPreset = "ml_default"; // replace with your upload preset

  const formData = new FormData();
  formData.append("file", file);
  formData.append("OdZJDM2mJ_rQak89yH9zTrKoLik", uploadPreset);

  try {
    const response = await axios.post(url, formData);
    return response.data.secure_url; // This is the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
