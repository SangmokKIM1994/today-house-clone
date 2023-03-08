const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const router = require("./api/routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
  //모든주소에서 서버로 요청을 보낼수있다. 현재 쓰고있는서버만 열게 바꾸기
  //cors origin option
);

app.use(express.json());
app.use(cookieparser()); //쓸 이유가 없어보인다. cookie를 다루는 곳이 없다.
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.use((error, req, res, next) => {
  console.error(error);
  return res
    .status(error.code || 500)
    .json({ message: error.message || "서버 에러." });
});

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
