import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallary from "../components/misc/ImageGallary";
import Calgary from "../assets/Calgary.jpg";
import AdFeatures from "../components/cards/AdFeatures";
import { format } from "../helpers/ad";
import dayjs from "dayjs";
import Like from "../components/misc/Like";
import Map from "../components/cards/Map";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime); //fromnow() 3 days ago etc

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
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary disabled mt-5">
                {" "}
                {ad.type ? ad.type : ""} for {ad.action ? ad.action : ""}
              </button>
              <Like ad={ad} />
            </div>

            <div className="mt-4">
              {ad?.sold ? "❌  Off market " : " ✅  In market"}
            </div>

            <h1>{ad.address}</h1>
            <AdFeatures ad={ad} />
            <h3 className="mt-3 h2">CAD&nbsp;{format(ad.price)}</h3>
            <p className="text-muted">{dayjs(ad?.createdAt).fromNow()}</p>
          </div>
          <div className="col-lg-8">
            <ImageGallary photos={generatePhotoArea(ad?.photos)} />
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 mt-3">
            <Map ad={ad} />
          </div>
        </div>
      </div>
    </>
  );
}
