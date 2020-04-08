const axios = require("axios");

module.exports = {
  uploadPhoto: async (user, photo) => {
    try {
      const storageUser = process.env.IMAGE_USER;
      const storagePass = process.env.IMAGE_PASSWORD;
      const storageService = process.env.IMAGE_SERVICE;

      const data = {
        username: storageUser,
        password: storagePass,
        id: user,
        photo: photo,
      };

      const uploadPhoto = await axios.post(storageService, data);

      return uploadPhoto.data.photo;
    } catch (error) {
      console.log(error);
      throw "Image upload not found";
    }
  },
};
