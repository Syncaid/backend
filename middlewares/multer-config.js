import multer, { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export default multer({
  storage: diskStorage({
    destination: (req, file, callback) => {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      callback(null, join(__dirname, ".." + process.env.IMGURL));
    },
    filename: (req, file, callback) => {
      const UniqueImgName =
        "syncaid" + Date.now() + "_" + Math.round(Math.random() * 1e9);
      const extension = MIME_TYPES[file.mimetype];
      callback(null, UniqueImgName + "." + extension);
    },
  }),

  limits: 10 * 1024 * 1024,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
}).single("ProfilePhoto");
