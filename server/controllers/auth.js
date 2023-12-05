import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../models/user.js";
import { nanoid } from "nanoid";
import { response } from "express";

export const welcome = (req, res) => {
  res.json({
    data: "Hello from nodejs api",
  });
};

export const preRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
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

    const hashedPassword = await hashPassword(password);
    const user = await new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refereshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({
      token,
      refereshToken,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.json({error:"Something went wrong"})
  }
};
