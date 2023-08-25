const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(express.json());
let db;
(async () => {
  const client = await new MongoClient("mongodb://127.0.0.1:27017").connect();
  db = client.db("revoufajar");
})();

//CRUD
app.post("/v1/users", async (req, res) => {
  console.log(req.body);
  const { username, email } = req.body;
  const user = await db.collection("users").insertOne({ username, email });
  res.status(200).json({
    message: "success",
    data: user,
  });
});

app.get("/v1/users", async (req, res) => {
  const users = await db
    .collection("users")
    .find({ is_deleted: { $exists: false } })
    .toArray();
  res.status(200).json({
    message: "success",
    data: users,
  });
});

app.put("/v1/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const user = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { username, email } });

  res.status(200).json({
    message: "success",
    data: user,
  });
});

app.delete("/v1/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { is_deleted: true } }
    );

  res.status(200).json({
    message: "success",
  });
});

// app.delete("/v1/users/:id", async (req, res) => {
//   const { id } = req.params;
//   const { username, email } = req.body;
//   const user = await db
//     .collection("users")
//     .deleteOne({ _id: new ObjectId(id) }, { $set: { username, email } });

//   res.status(200).json({
//     message: "success",
//     data: user,
//   });
// });

const port = 3000;

app.listen(port, () => {
  console.log("Running on port http://localhost:${port}");
});
