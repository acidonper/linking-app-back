const cloudinary = require("cloudinary").v2;

module.exports = {
    uploadPhoto: async (user, photo) => {
        const newPhoto = await cloudinary.uploader.upload("./files/sample.jpg");
        return newPhoto;
    }
};
