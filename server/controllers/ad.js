import * as config from "../config.js";
import { nanoid } from "nanoid";
import User from "../models/user.js";
import slugify from "slugify";
import Ad from "../models/ad.js";

export const uploadImage = async (req, res) => {
  try {
    // console.log(req.body);
    const { image } = req.body;
    const base64image = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    //aws s3

    const params = {
      Bucket: "myhommy-bucket",
      Key: `${nanoid()}.${type}`,
      Body: base64image,
      ACL: "public-read",
      contentEncoding: "base64",
      contentType: `image/${type}`,
    };

    config.AWSS3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        console.log(data), res.send(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Upload failed, Try again." });
  }
};

export const deleteImage = (req, res) => {
  try {
    const { Key, Bucket } = req.body;
    config.AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send({ ok: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (req, res) => {
  try {
    // console.log(req.body);
    const { photos, description, title, address, price, type, landsize } =
      req.body;
    if (!photos.length) {
      return res.json({ error: "Photos are required" });
    }
    if (!price) {
      return res.json({ error: "Price is required" });
    }
    if (!address) {
      return res.json({ error: "Address is required" });
    }
    if (!type) {
      return res.json({ error: "Is property house or land" });
    }
    if (!description) {
      return res.json({ error: "Please describe the propery" });
    }

    const geo = await config.GOOGLE_GEOCODER.geocode(address);
    console.log("Geo=>", geo);

    const ad = await new Ad({
      ...req.body,
      postedBy: req.body._id,
      location: {
        type: "Point",
        coordinate: [geo?.[0]?.longitude, geo?.[0].latitude],
      },
      googleMap: geo,
      slug:slugify(`${type}-${address}-${price}-${nanoid(6)}`) //unique slug
    });

    ad.save();

    // user role is seller now since defaut is buyer

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { role: "Seller" }, //
      },
      { new: true }
    );

    user.password=undefined
    user.resetCode=undefined

    res.json({ad,user})
  } catch (err) {
    res.json({ error: "Something went wrong,try again" });
    console.log(err);
  }
};
