const { ObjectId } = require('mongodb');
const Post = require('../schemas/post');
const User = require('../schemas/user');

const getPost = async (_, res) => {
  try {
    const post = await Post.find({}).populate('author');
    return res.json({ result: true, message: "게시글 목록조회 성공!!", postList: post });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "게시글 목록조회 실패!" });
  }
};

const writePost = async (req, res) => {
  const author = await User.findOne({ userId: req.body.userId });
  try {
    const post = await Post.create({
      title: req.body.postTitle,
      body: req.body.postBody,
      author: author,
    });
    console.log(post);
    return res.json({ result: true, message: "게시글 입력성공!" });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "게시글 입력실패!" });
  }
};

const viewPost = async (req, res) => {
  console.log(`id : ${req.params.id}`);
  try {
    const post = await Post.findOne({
      _id: ObjectId(req.params.id)
    });
    console.log(post);
    res.json({ result: post });
  } catch (error) {
    console.log(error);
    res.json({ result: false });
  }
};

module.exports = { getPost, writePost, viewPost };