const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const router = require("./api/routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedOrigins: [process.env.CORS_ORIGIN_OPTION],
  })
);

app.use(express.json());
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
