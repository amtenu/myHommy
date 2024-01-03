import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ImageGallary from "../components/misc/ImageGallary";
import Calgary from "../assets/Calgary.jpg"




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
      <ImageGallary photos={generatePhotoArea(ad?.photos)}/>
      <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
    </>
  );
}
