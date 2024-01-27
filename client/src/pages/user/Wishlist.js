import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import AdUser from "../../components/cards/AdUser";
import AdCard from "../../components/cards/AdCard";

export default function Wishlist() {
  const [auth, setAuth] = useAuth();

  //state

  const [ads, setAds] = useState([]);

  

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/wishListed`);
     setAds(data)
        
    } catch (err) {
      console.log(err);
     
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Wishlist</h1>
      <Sidebar />

      {!ads?.length ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center vh-100 "
            style={{ marginTop: "-10%" }}
          >
            <h2>
              Hello {auth.user?.name ? auth.user?.name : auth.user?.username} ,
              You have not liked any Properties yet.
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
                <p className="text-center">You liked {ads?.length} properties .</p>
              </div>
              <div className="row ">
                {ads?.map((ad) => (
                  <AdCard ad={ad} key={ad._id} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
