const { error } = require("../error/error.js");
const CommentsService = require("../services/comments.service.js");

module.exports = class CommentsController {
  //댓글 작성
  createComment = async (req, res, next) => {};
  //댓글 조회
  getComments = async (req, res, next) => {};
  //댓글 수정
  editComments = async (req, res, next) => {};
  //댓글 삭제
  deleteComment = async (req, res, next) => {};
};
