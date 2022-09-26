const multer = require("multer");

// convertion's dictionnary
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png"
};

// Stock sur le disque les fichiers envoyés dans un dossiers spécifique, et creation du nom de fichier
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});

// Export du middleware de multer d'une image "unique" et non un groupe de fichiers
module.exports = multer({ storage: storage }).single("image");
