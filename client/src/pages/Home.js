import axios from "axios";
import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";

export default function Home() {
  //context from Auth
  const [auth, setAuth] = useState();
  //state

  const [adsForSell, setAdsForSell] = useState();
  const [adsForRent, setAdsForRent] = useState();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads");
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Home</h1>
      <pre>{JSON.stringify({adsForSell,adsForRent}, null, 5)}</pre>
    </div>
  );
}
