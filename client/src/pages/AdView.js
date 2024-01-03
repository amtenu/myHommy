import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ImageGallary from "../components/misc/ImageGallary";
import Calgary from "../assets/Calgary.jpg";
import AdFeatures from "../components/cards/AdFeatures";

export default function AdView() {
  //The state

  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);

  // for modal of image

  //Hooks

  const params = useParams();

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data?.ad);
      setRelated(data?.related);
    } catch (err) {
      console.log(err);
    }
  };

  const generatePhotoArea = () => {
    if (ad.photos?.length > 0) {
      const x = ad.photos?.length === 1 ? 2 : 4;
      let array = [];

      ad.photos.map((photo) => {
        array.push({
          src: photo.Location,
          width: x,
          height: x,
        });
      });
      return array;
    } else {
      return [
        {
          src: Calgary,
          width: 2,
          height: 1,
        },
      ];
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-4">
            <button className="btn btn-primary disabled mt-5">
              {" "}
              {ad.type ? ad.type : ""} for {ad.action ? ad.action : ""}
            </button>

            <div className="mt-4">{ad?.sold ? "❌  Off Market " : " ✅  In Market"}</div>

            <h1>{ad.address}</h1>
            <AdFeatures ad={ad}/>
          </div>
          <div className="col-lg-8">
            <ImageGallary photos={generatePhotoArea(ad?.photos)} />
          </div>
        </div>
      </div>

      <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
    </>
  );
}
