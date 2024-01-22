import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../models/user.js";
import { nanoid } from "nanoid";
import emailVaidator from "email-validator";

export const welcome = (req, res) => {
  res.json({
    data: "Hello from nodejs api",
  });
};

export const preRegister = async (req, res) => {
  try {
    const { email, password } = req.body; //TO DO , validate email

    if (!emailVaidator.validate(email)) {
      return res.json("Please input a valid email");
    }

    if (!password) {
      return res.json({ error: "Password is required!" });
    }
    if (password && password?.length < 8) {
      return res.json({
        error: "Password length must be at least 8 characters!",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: "Email already exists" });
    }

    const token = jwt.sign({ email, password }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    config.AWSSES.sendEmail(
      emailTemplate(
        email,
        `
    <p>Please click the link below to activate your account. </p>
    <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Acitivate my account</a>
    `,
        config.EMAIL_TO,
        "Activate your account"
      ),
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ ok: false });
        } else {
          console.log(data);
          return res.json({ ok: true });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.json({ error: "Oppppppssssyy ERROR, TRY AGAIN" });
  }
};

export const register = async (req, res) => {
  try {
    //console.log(req.body);
    const { email, password } = jwt.verify(req.body.token, config.JWT_SECRET);
    //console.log(email,password)
    //TO DO , check about email....

    const hashedPassword = await hashPassword(password);
    const user = await new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({
      token,
      refreshToken,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find user by thier email
    // compare with db
    // jwt oken and respond

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.json({ error: "No User found.Please register." });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({
      token,
      refreshToken,
      user,
    });
  } catch (err) {
    return res.json({ error: "Cann't login , please check." });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    //email
    const { email } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.json({
        error: "Could not find user with this" + `${email}` + "email",
      });
    } else {
      const resetCode = nanoid();
      user.resetCode = resetCode;
      user.save();
      const token = jwt.sign({ resetCode }, config.JWT_SECRET, {
        expiresIn: "1hr",
      });
      config.AWSSES.sendEmail(
        emailTemplate(
          email,
          `
        <p>Click the below link to access your account</p>
        <a href="${config.CLIENT_URL}/auth/access-account/${token}"> Access my account</a>
        `,
          config.EMAIL_TO,
          "Access Your Account"
        ),
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json({ ok: false });
          } else {
            console.log(data);
            return res.json({ ok: true });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.json({ err: "Something went wrong!" });
  }
};

export const accessaccount = async (req, res) => {
  try {
    const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET); // token with another name
    const user = await User.findOneAndUpdate(
      { resetCode: resetCode },
      { resetCode: "" }
    );

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({
      token,
      refreshToken,
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { _id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);

    const user = await User.findById(_id);
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({
      token,
      refreshToken,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Refresh Token failed" });
  }
};

export const currentuser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Unauthorized" });
  }
};

export const publicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    user.password = undefined;
    user.resetCode = undefined;
  } catch (err) {
    console.log(err);
    return res.json({ error: "User not found" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.json({ error: "Password is required" });
    }
    if (password && password?.length < 8) {
      return res.json({ error: "Password is at least 8 characters long" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
      password: await hashPassword(password),
    });

    res.json({ Ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: "User not found" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.codeName === "DuplicateKey") {
      return res.json({ error: "Username or email is already taken" });
    }
    return res.status(403).json({ error: "Unauthorized" });
  }
};
