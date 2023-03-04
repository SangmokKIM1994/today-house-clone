const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.controller.js");
const commentsController = new CommentsController();

//댓글 작성
router.post("/goods/:goodsId/comments", commentsController.createComment);
//댓글 조회
router.get("/goods/:goodsId/comments", commentsController.getComments);
//댓글 수정
router.put("/comments/:commentId", commentsController.editComments);
//댓글 삭제
router.delete("/comments/:commentId", commentsController.deleteComment);

module.exports = router;
