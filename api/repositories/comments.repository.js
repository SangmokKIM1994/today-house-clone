const { Comments } = require("../../db/models");

class CommentsRepository {
  //댓글 작성
  createComment = async ({ userId, postId, comment }) => {
    const post = await Comments.create({
      userId,
      postId,
      comment,
    });
    return post;
  };

  //댓글 조회
  getComments = async ({ postId }) => {
    const comments = await this.Comments.findAll({
      attributes: [
        "nickName",
        "commentId",
        "comment",
        "createdAt",
        "updatedAt",
      ],
    });
    return comments;
  };

  //댓글 수정
  editComments = async ({ commentId, comment }) => {
    const edit = await Comments.update({ comment }, { where: { commentId } });
    return edit;
  };

  //댓글 삭제
  deleteComment = async ({ commentId }) => {
    const deleted = await Comments.destroy({ where: { commentId } });
    return deleted;
  };
}

module.exports = CommentsRepository;
