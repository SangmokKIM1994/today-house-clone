const CommentsService = require("../services/comments.service.js");

class CommentsController {
  commentsService = new CommentsService();
  //댓글 작성
  createComment = async (req, res, next) => {
    const { postId } = req.params;
    const { comment } = req.body;

    const result = await this.CommentsService.createComment({
      userId,
      postId,
      comment,
    });
    return res.status(201).json({ message: "댓글이 생성되었습니다." });
  };

  //댓글 조회
  getComments = async (req, res, next) => {
    const { postId } = req.parmas;
    const result = await this.CommentsService.getComments({
      postId,
    });
    return res.status(200).json({ data: result });
  };

  //댓글 수정
  editComments = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    const { comment } = req.body;

    const result = await this.CommentsService.editComments({
      userId,
      commentId,
      comment,
    });
    return res.status(200).json({ message: "댓글이 수정되었습니다." });
  };

  //댓글 삭제
  deleteComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { commentId } = res.params;

    const result = await this.CommentsService.deleteComment({
      userId,
      commentId,
    });
    return res.status(200).json({ message: "댓글이 삭제되었습니다." });
  };
}

module.exports = CommentsController;
