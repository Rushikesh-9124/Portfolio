import multer from "multer";
import cloudinary from "./cloudinary.js";
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'protfolio_images',
        allowed_types: ['jpeg', 'png', 'webp', 'jpg']
    }
})

const upload = multer({storage})
export default upload