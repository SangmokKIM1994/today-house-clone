const { error } = require("../error/error.js");
const { Comments, Users } = require("../../db/models");

module.exports = class CommentsRepository {
  //댓글 작성
  createComment = async ({ userId, postId, comment }) => {
    const Comment = await comments.create({});
  };
  //댓글 조회
  getComments = async ({ postId }) => {};
  //댓글 수정
  editComments = async ({ commentId, comment }) => {};
  //댓글 삭제
  deleteComment = async ({ commentId }) => {};
};
