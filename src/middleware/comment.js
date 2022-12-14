const { ObjectId } = require('mongodb');
const Comment = require('../schemas/comment');

const commentList = async (req, res) => {
  try {
    const cmt = await Comment.find({
      postId: req.params.id
    });
    console.log("postId :" + req.params.id);
    return res.json({ result: true, message: "댓글 목록조회 성공!!", cmtList: cmt });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "댓글 목록조회 실패!" });
  }
};

const writeComment = async (req, res) => {
  const date = new Date();
  try {
    const cmt = await Comment.create({
      body: req.body.cmtBody,
      userId: req.body.userId,
      postId: req.body.postId,
      date: date.toLocaleString(),
    });
    console.log(cmt);
    return res.json({ result: true, message: "댓글 입력성공!" });

  } catch (error) {
    console.log(error);
    return res.json({ result: false, message: "댓글 입력실패!" });
  }
};

module.exports = { commentList, writeComment };