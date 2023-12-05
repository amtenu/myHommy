import * as config from "../config.js";

export const welcome = (req, res) => {
  res.json({
    data: "Hello from nodejs api",
  });
};

export const preRegister = async (req, res) => {
  try {
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
              <h1>WELCOME TO myHommy</h1>
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
