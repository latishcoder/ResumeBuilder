import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//FILE FILTER
const fileFilter = (req, file, cb) => {
  const allowTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowTypes.includes(file.mimetype)) {
      cb(null, true);
  }   
   else {
      cb(new Error("Only .jpg, .jpeg and .png format allowed!"), false);
  
  }
};

const upload = multer({  storage, fileFilter });
export default upload;
