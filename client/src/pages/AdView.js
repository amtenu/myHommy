import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Gallery from 'react-photo-gallery'

const photos = [
  {
    src: 'https://myhommy-bucket.s3.ca-central-1.amazonaws.com/dnlUeznBaQlHUr8OQkO7g.jpeg',
    width: 4,
    height: 3
  },
  {
    src: 'https://myhommy-bucket.s3.ca-central-1.amazonaws.com/dnlUeznBaQlHUr8OQkO7g.jpeg',
    width: 1,
    height: 1
  }
];

export default function AdView() {


  //The state

  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);

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

  return (
    <>
    <Gallery  photos={photos}/>
      <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>

    </>
  );
}
