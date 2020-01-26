const cloudinary = require("cloudinary").v2;
// cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });
// cloudinary.image("sample", {"crop":"fill","gravity":"faces","width":300,"height":200,"format":"jpg"});

// cloudinary.config({
//   cloud_name: 'sample',
//   api_key: '874837483274837',
//   api_secret: 'a676b67565c6767a6767d6767f676fe1'
// });

module.exports = {
    uploadPhoto: (user, photo) => {
        console.log(user, photo);
        cloudinary.uploader.upload("./files/sample.jpg", function(result) {
            console.log(result);
        });
    }
};
