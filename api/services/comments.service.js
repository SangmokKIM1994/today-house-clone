const GoodsRepository = require("../repositories/goods.repository");
const CommentsRepository = require("../repositories/comments.repository");
const UsersRepository = require("../repositories/user.repository");
const { makeError } = require("../error");

class CommentsService {
  commentsRepository = new CommentsRepository();
  goodsRepository = new GoodsRepository();
  usersRepository = new UsersRepository();

  //댓글 작성
  createComment = async ({ userId, goodsId, comment }) => {
    const user = await this.usersRepository.userFindById({ userId });
    const result = await this.commentsRepository.createComment({
      userId,
      goodsId,
      comment,
      nickName: user.nickName,
    });
    if (!result) {
      throw new makeError({ message: "댓글 생성에 실패했습니다.", code: 500 });
    }
    return result;
  };

  //댓글 조회
  getComments = async ({ goodsId }) => {
    const comments = await this.commentsRepository.getComments({
      goodsId,
    });
    if (!comments) {
      throw new makeError({ message: "댓글 조회에 실패했습니다.", code: 500 });
    }
    return comments;
  };

  //댓글 수정
  editComments = async ({ userId, commentId, comment }) => {
    const edit = await this.commentsRepository.editComments({
      userId,
      commentId,
      comment,
    });
    if (!edit) {
      throw new makeError({
        message: "게시글 수정에 실패했습니다.",
        code: 500,
      });
    }
    return { message: "댓글이 수정되었습니다." };
  };

  //댓글 삭제
  deleteComment = async ({ userId, commentId }) => {
    const deleted = await this.commentsRepository.deleteComment({
      userId,
      commentId,
    });
    if (!deleted) {
      throw new makeError({ message: "댓글 삭제를 실패했습니다.", code: 500 });
    }
    return { message: "댓글이 삭제되었습니다." };
  };
}

module.exports = CommentsService;
