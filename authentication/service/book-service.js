const getAllBooks = async (req, res) => {
  try {
    const books = await req.db.collection("books").find().toArray();
    res.status(200).json({
      message: "Buku sudah berhasil dilihat",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBooks = async (req, res) => {
  const { title, author } = req.body;

  try {
    const newBook = await req.db
      .collection("books")
      .insertOne({ title, author });

    res.status(200).json({
      message: "Buku sudah berhasil dimasukkan",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  createBooks,
};
