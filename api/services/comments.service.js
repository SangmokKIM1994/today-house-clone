const { error } = require("../error/error.js");
const CommentsRepository = require("../repositories/comments.repositories.js");
const PostsRepository = require("../repositories/posts.repositories.js");

module.exports = class CommentsService {
  //댓글 작성
  createComment = async ({ userId, postId, comment }) => {};
  //댓글 조회
  getComments = async ({ postId }) => {};
  //댓글 수정
  editComments = async ({ userId, commentId, comment }) => {};
  //댓글 삭제
  deleteComment = async ({ userId, commentId }) => {};
};
