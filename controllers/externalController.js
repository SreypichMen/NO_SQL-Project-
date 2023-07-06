var fs = require("fs");
var cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'dnuixbbzf', 
    api_key: '657372252247566', 
    api_secret: '9NUgToVJGZjuBSa7ZCX-91FBJ4A' 
  });

  const upload_image = (req, res) => {
    console.log(req.file);
    //upload to cloudinary
    cloudinary.uploader.upload(req.file.path, function (error, result) {
      console.log(result, error);
      if (error) {
        removeFile(req.file.path); //remove file from folder
        return res.status(500).json({ success: false, error: error });
      } else {
        removeFile(req.file.path); //remove file from folder
        return res.status(201).json({ success: true, data: result.secure_url });
      }
    });
  };
  
  function removeFile(path) {
    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }
  
  module.exports = {
    upload_image,
  };