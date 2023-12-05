export const welcome = (req, res) => {
  res.json({
    data: "Hello from nodejs api",
  });
};

export const preRegister = async (req, res) => {
  try {
    console.log(req.body);

    let emailSent = true;
    if (emailSent) {
      return res.json({ ok: true });
    } else {
      return res.json({ ok: false });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: "Oppppppssssyy ERROR, TRY AGAIN" });
  }
};
