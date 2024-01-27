import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import AdUser from "../../components/cards/AdUser";
import AdCard from "../../components/cards/AdCard";

export default function Enquiries() {
  const [auth, setAuth] = useAuth();

  //state

  const [ads, setAds] = useState([]);
  

 
 

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/enquiried-properties`);
      setAds(data);   
    } catch (err) {
      console.log(err);
    
    }
  };
  

  
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Enquiries</h1>
      <Sidebar />

      {!ads?.length ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center vh-100 "
            style={{ marginTop: "-10%" }}
          >
            <h2>
             Hey {auth.user?.name ? auth.user?.name : auth.user?.username} ,
             You have no enquiried properties.
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
                <p className="text-center">Total {ads.length} enquiries found.</p>
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
