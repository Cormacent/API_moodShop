const { uploader } = require('cloudinary').v2;

async function upload(filePath) {
  try {
    let result = await uploader.upload(filePath, {
      folder: 'moodshop/product',
      use_filename: true,
    });
    return result.url;
  } catch (error) {
    throw error;
  }
}
module.exports = upload;
