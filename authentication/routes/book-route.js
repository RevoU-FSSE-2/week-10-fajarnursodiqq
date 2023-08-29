const { Router } = require("express");
const { getAllBooks, createBooks } = require("../service/book-service.js");
const authorizationMiddleware = require("../middleware/authorization-middleware.js");

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/", authorizationMiddleware, createBooks);

module.exports = bookRouter;
