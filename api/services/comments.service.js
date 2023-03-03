const { error } = require("../error/error.js");
const CommentsRepository = require("../repositories/comments.repositories.js");
const PostsRepository = require("../repositories/posts.repositories.js");

class CommentsService {
  //댓글 작성
  createComment = async ({ userId, postId, comment }) => {
    const result = await this.CommentsRepository.createComment({
      userId,
      postId,
      comment,
    });
    return result;
  };

  //댓글 조회
  getComments = async ({ postId }) => {
    const comments = await this.CommentsRepository.getComments({
      postId,
    });
    return comments;
  };

  //댓글 수정
  editComments = async ({ userId, commentId, comment }) => {
    const edit = await this.CommentsRepository.editComments({
      commentId,
      comment,
    });
    return { message: "댓글이 수정되었습니다." };
  };

  //댓글 삭제
  deleteComment = async ({ userId, commentId }) => {
    const deleted = await this.CommentsRepository.deleteComment({
      commentId,
    });
    return { message: "댓글이 삭제되었습니다." };
  };
}

module.exports = CommentsService;
