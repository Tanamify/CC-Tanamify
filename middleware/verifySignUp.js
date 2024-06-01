const db = require("../model");
const Pengguna = db.pengguna;

checkDuplicateUsername = async (req, res, next) => {
  try {
    const username = await Pengguna.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(400).send({ message: "Username tidak tersedia" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: "Gagal membuat akun" });
  }
};

const verifySignUp = { checkDuplicateUsername };
module.exports = verifySignUp;
