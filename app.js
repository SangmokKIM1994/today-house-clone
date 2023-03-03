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
);

app.use(express.json());
app.use(cookieparser());

app.use("/api", router);

app.use((error, req, res, next) => {
  return res
    .status(error.code || 500)
    .json({ message: error.message || "서버 에러." });
});

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
