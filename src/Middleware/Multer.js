const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/upload',
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filter });
module.exports = upload;
