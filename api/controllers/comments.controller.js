const CommentsService = require("../services/comments.service.js");
const { makeError } = require("../error");

class CommentsController {
  commentsService = new CommentsService();

  //댓글 작성
  createComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { goodsId } = req.params;
    const { comment } = req.body;
    try {
      if (!(goodsId && comment)) {
        throw new makeError({
          message: "적절하지 않은 파라미터 요청입니다.",
          code: 400,
        });
      }
      const result = await this.CommentsService.createComment({
        userId,
        goodsId,
        comment,
      });
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  //댓글 조회
  getComments = async (req, res, next) => {
    const { goodsId } = req.parmas;
    try {
      if (!goodsId) {
        throw new makeError({
          message: "적절하지 않은 파라미터 요청입니다.",
          code: 400,
        });
      }
      const result = await this.CommentsService.getComments({
        goodsId,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  //댓글 수정
  editComments = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    const { comment } = req.body;

    try {
      if (!(commentId && comment)) {
        throw new makeError({
          message: "적절하지 않은 파라미터 요청입니다.",
          code: 400,
        });
      }
      const result = await this.CommentsService.editComments({
        userId,
        commentId,
        comment,
      });
      if (!result) {
        throw new makeError({
          messasge: "댓글조회에 실패했습니다.",
          code: 404,
        });
      }
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  //댓글 삭제
  deleteComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { commentId } = res.params;

    try {
      if (!coomentId) {
        throw new makeError({
          message: "적절하지 않은 파라미터 요청입니다.",
          code: 400,
        });
      }
      const result = await this.CommentsService.deleteComment({
        userId,
        commentId,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CommentsController;
