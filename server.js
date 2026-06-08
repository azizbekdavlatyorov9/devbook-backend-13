const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authorRouter = require("./router/author.routes");
const BookRouter = require("./router/book.routes");
require("dotenv").config();
const upload = require("./middlewares/upload");
const errorMiddleware = require("./middlewares/error.middleware");
const authRouter = require("./router/auth.routes");
const app = express();
const cookieParser = require("cookie-parser");
const CitationRouter = require("./router/citation.routes");
const likeRouter = require("./router/like.routes");

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(cookieParser())

//upload_file
app.use("/images", express.static("uploads/images"));

app.post("/upload", upload.array("upload"), (req, res) => {
  const images = req.files.map(
    (image, i) => `http://localhost:4001/images/${req.files[i].filename}`,
  );

  res.status(200).json({
    data: images,
  });
});

connectDB();

// Router
app.use(authRouter);
app.use(authorRouter);
app.use(BookRouter);
app.use(CitationRouter)
app.use(likeRouter)

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});
