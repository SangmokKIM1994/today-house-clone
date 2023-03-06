const { Comments } = require("../../db/models");
const UsersController = require("../controllers/user.controller");

class CommentsRepository {
  //댓글 작성
  createComment = async ({ userId, goodsId, comment }) => {
    const post = await Comments.create({
      userId,
      goodsId,
      comment,
    });
    return post;
  };

  //댓글 조회
  getComments = async ({ goodsId }) => {
    const comments = await this.Comments.findAll({
      where: { goodsId },
      attributes: ["userId", "commentId", "comment", "createdAt", "updatedAt"],
      include: { model: Users, attributes: ["nickname"] },
      order: [["createdAt", "DESC"]],
      raw: true,
    });
    return comments;
  };

  //댓글 수정
  editComments = async ({ userId, commentId, comment }) => {
    const edit = await Comments.update(
      { comment },
      { where: { userId, commentId } }
    );
    return edit;
  };

  //댓글 삭제
  deleteComment = async ({ commentId, userId }) => {
    const deleted = await Comments.destroy({ where: { commentId, userId } });
    return deleted;
  };
}

module.exports = CommentsRepository;
