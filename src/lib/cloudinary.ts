import { v2 as cloudinary } from 'cloudinary';

(async function() {
    // Configuration
    cloudinary.config({ 
        cloud_name: 'de1yb6gze', 
        api_key: '672785872367862', 
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
})();

export default cloudinary