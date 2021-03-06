const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const query = require("../config/mysql.conf");

async function signup(res, username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user) {
      return res.send({
        success: false,
        error: "Username already taken. Please try again.",
        data: null,
      });
    }

    // im a comment
    const hash = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    await query("INSERT INTO users (username, password, uuid) VALUES (?,?,?)", [
      username,
      hash,
      uuid,
    ]);
    return res.send({
      success: true,
      error: null,
      data: "Sign up successful! Login to play!",
    });
  } catch (e) {
    res.send({
      success: false,
      data: null,
      error: "Something went wrong, please try again later!",
    });
  }
}

async function login(res, username, password) {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (!user) {
      return res.send({
        success: false,
        error: "Incorrect Username or Password",
        data: null,
      });
    }
    let matches = await bcrypt.compare(password, user.password);
    if (!matches) {
      return res.send({
        success: false,
        data: null,
        error: "Incorrect Username or Password",
      });
    }
    const payload = { uuid: user.uuid };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7 days",
    });
    return res.cookie("jwt", token, { httpOnly: true, maxAge: 36000 }).send({
      success: true,
      data: { username: user.username },
      error: null,
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: "Something went wrong. Please try again later!",
      data: null,
    });
  }
}

module.exports = { signup, login };
