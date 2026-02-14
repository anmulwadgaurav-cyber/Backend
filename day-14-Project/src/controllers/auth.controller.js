const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  /* Noob method
  const isUserExistsByEmail = await userModel.findOne({ email });

  if (isUserExistsByEmail) {
    return res.status(409).json({
      conflict: "Email already exists try different one",
    });
  }

  const isUserExistsByUsername = await userModel.findOne({ username });

  if (isUserExistsByUsername) {
    return res.status(409).json({
      conflict: "Username already exists try differenct one",
    });
  }
*/

  //Pro method
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  //$or ka matlab hota hai ki agar database me query karo $or ki basis pe ki agar username se koi exists karta hai to woh return kar dena OR agar email se koi exists karta hai to woh return kar dena.

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        isUserAlreadyExists.email === email
          ? "Email Already Exists"
          : "Username Already Exists",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    email,
    username,
    password: hash,
    bio,
    profileImage,
  });

  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
      //response me kabibhi password nahi bhejte
    },
    token,
  });
}

async function loginController(req, res) {
  const { email, username, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email }, { username }], //this is the array of conditions
  });

  if (!user) {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isPasswordCorrect = hashedPassword === user.password;

  if (!isPasswordCorrect) {
    return res.status(409).json({
      conflict: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
