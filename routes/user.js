const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const moment = require("moment");
const uuid = require("uuid");
const { Op } = require("sequelize");

function generateUUID() {
  return uuid.v4();
}
const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("NOW()"),
    get() {
      return moment(this.getDataValue("createdAt"))
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("NOW()"),
    get() {
      return moment(this.getDataValue("updatedAt"))
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
    },
  },
});

(async () => {
  try {
    await User.sync();
    console.log("User table created");
  } catch (err) {
    console.error("Error creating table", err);
  }
})();

router.post("/add-user", async (req, res) => {
  const { id, name, email, password } = req.body;

  if (!id || !name || !email || !password) {
    return res.status(400).send("Please provide all the fields");
  }

  try {
    // const existingUser = await User.findOne({
    //   where: {
    //     [Op.or]: [{ email }, { password }],
    //   },
    // });
    // if (existingUser) {
    //   return res.status(400).send("Email or password already exists");
    // }

    const existingEmail = await User.findOne({
      where: {
        email,
      },
    });
    const existingPassword = await User.findOne({
      where: {
        password,
      },
    });
    if (existingEmail) {
      return res.status(400).send("Email already exists");
    }
    if (existingPassword) {
      return res.status(400).send("Password already exists");
    }
    if (existingEmail && existingPassword) {
      return res.status(400).send("Email and password already exists");
    }

    const id = generateUUID();
    const newUser = await User.create({
      id,
      name,
      email,
      password,
    });
    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
