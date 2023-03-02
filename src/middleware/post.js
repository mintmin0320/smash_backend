const { ObjectId } = require('mongodb');
const Post = require('../schemas/post');
const Comment = require('../schemas/comment');


const postList = async (_, res) => {
  try {
    const post = await Post.find({}).sort({ _id: -1 });
    return res.json({ result: true, message: "게시글 목록조회 성공!!", postList: post });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "게시글 목록조회 실패!" });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: ObjectId(req.body.postId) });
    await Comment.deleteMany({ postId: ObjectId(req.body.postId) })
    return res.json({ result: true, message: "게시글 삭제 성공!!" });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "게시글 삭제 실패!" });
  }
};

const writePost = async (req, res) => {
  const date = new Date();
  // const author = await User.findOne({ userId: req.body.userId });
  try {
    const post = await Post.create({
      title: req.body.postTitle,
      body: req.body.postBody,
      userId: req.body.userId,
      date: date.toLocaleString(),
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
    res.json({ result: post, message: "게시물 상세조회 성공" });
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "게시물 상세조회 실패" });
  }
};

const searchPost = async (req, res) => {
  console.log(`search : ${req.params.search}`);
  const regex = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRegex = regex(req.params.search);
  try {
    const post = await Post.find({
      title: { $regex: searchRegex }
    });
    console.log(post);
    res.json({ result: true, postList: post, message: "게시물 검색 성공" });
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "게시물 검색 실패" });
  }
};

module.exports = { postList, writePost, viewPost, searchPost, deletePost };