import * as config from "../config.js";
import jwt from "jsonwebtoken";
import { emailTemplate } from "../helpers/email.js";

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
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
};
