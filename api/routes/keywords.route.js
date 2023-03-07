const express = require("express");
const router = express.Router();
const KeywordsController = require("../controllers/keywords.controller");
const keywordsController = new KeywordsController();

router.post("/", keywordsController.addKeyword);
router.get("/", keywordsController.showKeyword);

module.exports = router;
