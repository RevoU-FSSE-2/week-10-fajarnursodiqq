require("dotenv").config();

const express = require("express");
const databaseMiddleware = require("./middleware/database-middleware.js");
const authRouter = require("./routes/auth-route.js");
const bookRouter = require("./routes/book-route.js");
const authMiddleware = require("./middleware/authentication-middleware.js");

const app = express();

app.use(express.json());
app.use(databaseMiddleware);

app.get("/", (req, res) => {
  res.send("Fajar sedang mencoba");
});

app.use("/auth", authRouter);
app.use("/books", authMiddleware, bookRouter);

const port = 3000;

app.listen(port, () => {
  console.log("Running on port http://localhost:${port}");
});
