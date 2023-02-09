const { ObjectId } = require('mongodb');
const Match = require('../schemas/match');
const User = require('../schemas/user');

const groupList = async (_, res) => {
  try {
    const match = await Match.find({}).sort({ _id: -1 }).populate('author');
    return res.json({ result: true, message: "그룹 목록조회 성공!!", groupList: match });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "그룹 목록조회 실패!" });
  }
};

const recruitGroup = async (req, res) => {
  const date = new Date();
  const author = await User.findOne({ userId: req.body.userId });
  try {
    const match = await Match.create({
      title: req.body.title,
      count: req.body.count,
      body: req.body.body,
      category: req.body.category,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      // author: "author",
      date: date.toLocaleString(),
    });
    console.log(match);
    return res.json({ result: true, message: "그룹 생성 성공!" });
  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "그룹 생성 실패!" });
  }
};

const detailView = async (req, res) => {
  console.log(`id : ${req.params.id}`);
  try {
    const match = await Match.findOne({
      _id: ObjectId(req.params.id)
    }).populate('author');
    console.log(match);
    res.json({ result: match });
  } catch (error) {
    console.log(error);
    res.json({ result: false });
  }
};

const searchGroup = async (req, res) => {
  console.log(req.params.search);
  const regex = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRegex = regex(req.params.search);
  try {
    const match = await Match.find({
      title: { $regex: searchRegex }
    }).populate('author');
    console.log(match);
    res.json({ result: true, matchList: match, message: "shi" });
  } catch (error) {
    console.log(error);
    res.json({ result: false });
  }
};

const classificationGroup = async (req, res) => {
  console.log("category: " + req.params.category);
  try {
    const match = await Match.find({
      category: req.params.category
    });
    console.log(match);
    res.json({ result: true, groupList: match, message: "hi" });
  } catch (error) {
    console.log(error);
    res.json({ result: false });
  }
};

module.exports = { groupList, recruitGroup, searchGroup, detailView, classificationGroup };