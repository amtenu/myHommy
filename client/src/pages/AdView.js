import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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
      <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
    </>
  );
}
