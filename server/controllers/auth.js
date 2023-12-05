import * as config from "../config.js";
import jwt from "jsonwebtoken";

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
      {
        Source: config.EMAIL_FROM,
        Destination: {
          ToAddresses: ["amannugussie@gmail.com"],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `
             <html>
              <h1>WELCOME TO myHommy</h1>
              <p>Please click the link below to activate your account. </p>
              <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Acitivate my account</a>
</html>
              `,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Welcome to myHommy",
          },
        },
      },
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
