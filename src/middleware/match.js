const { ObjectId } = require('mongodb');
const Match = require('../schemas/match');
const User = require('../schemas/user');


const postList = async (_, res) => {
  try {
    const post = await Post.find({}).populate('author');
    return res.json({ result: true, message: "게시글 목록조회 성공!!", postList: post });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "게시글 목록조회 실패!" });
  }
};

const createMatch = async (req, res) => {
  const date = new Date();
  const author = await User.findOne({ userId: req.body.userId });
  try {
    const match = await Match.create({
      title: req.body.postTitle,
      body: req.body.postBody,
      author: author,
      date: date.toLocaleString(),
    });
    console.log(match);
    return res.json({ result: true, message: "그룹 생성 성공!" });

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
    }).populate('author');
    console.log(post);
    res.json({ result: post });
  } catch (error) {
    console.log(error);
    res.json({ result: false });
  }
};

const searchPost = async (req, res) => {
  console.log(`search : ${req.params.search}`);
  const regex = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRegex = regex(req.params.search);
  try {
    const post = await Post.find({
      title: { $regex: searchRegex }
    }).populate('author');
    console.log(post);
    res.json({ result: true, postList: post });
  } catch (error) {
    console.log(error);
    res.json({ result: false });
  }
};

module.exports = { postList, writePost, viewPost, searchPost };
