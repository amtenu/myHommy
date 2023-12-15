import * as config from "../config.js";
import { nanoid } from "nanoid";
export const uploadImage = async (req, res) => {
  try {
    // console.log(req.body);
    const { image } = req.body;
    const base64image = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type=image.split(';')[0].split('/')[1]

    //aws s3

    const params={
        Bucket:'myhommy-bucket',
        Key:`${nanoid()}.${type}`,
        Body:base64image,
        ACL:'public-read',
        contentEncoding:"base64",
        contentType:`image/${type}`
    }

    config.AWSS3.upload(params,(err,data)=>{
        if(err){
            console.log(err);
            res.sendStatus(400)

        } else {
            console.log(data),
            res.send(data)
        }
    })

  } catch (err) {
    console.log(err);
    res.json({ error: "Upload failed, Try again." });
  }
};
