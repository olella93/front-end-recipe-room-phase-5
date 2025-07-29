// Import all Kenyan recipe images
import eggCurryImage from '../assets/images/download (2).jpeg';
import nyamaCromaImage from '../assets/images/download (1).jpeg';
import matokeImage from '../assets/images/download.jpeg';

// Map backend image paths to imported images
const imageMap = {
  'assets/images/download (2).jpeg': eggCurryImage,
  'assets/images/download (1).jpeg': nyamaCromaImage,
  'assets/images/download.jpeg': matokeImage,
};

export const getRecipeImage = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL or imported image, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('data:') || imagePath.startsWith('/static/media/')) {
    return imagePath;
  }
  
  // Map backend paths to imported images
  return imageMap[imagePath] || imagePath;
};

export default getRecipeImage;
