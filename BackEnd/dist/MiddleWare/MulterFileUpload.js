import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads'); // folder to store resumes
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname)); // unique filename
    }
});
const upload = multer({ storage });
export default upload;
