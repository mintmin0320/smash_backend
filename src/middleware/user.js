const User = require('../schemas/user');

const uploadFile = async (req, res) => {
  console.log("file :", req.files.file.name)
  console.log("body :", req.params.userId)
  const userId = req.params.userId;
  const file = req.files.file;
  console.log(file);

  const path = __dirname + "/../../public/images/" + file.name;

  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });

  const user = await User.updateOne({
    userId: userId,
    $set: { fileName: file.name }
  });

  return res.send({ status: "success", user });
};

const downloadFile = async (req, res) => {
  console.log("params :", req.params.userId)

  const user = await User.findOne({
    userId: req.params.userId,
  }, { fileName: 1 });

  return res.send({ status: "success", user });
};

const getProfileData = async (req, res) => {
  console.log("params :", req.params.userId)

  const user = await User.findOne({
    userId: req.params.userId,
  });

  return res.send({ status: "success", user });
};

module.exports = { uploadFile, downloadFile, getProfileData };