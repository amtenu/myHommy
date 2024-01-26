import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import AdUser from "../../components/cards/AdUser";

export default function Home({ ad }) {
  const [auth, setAuth] = useAuth();

  //state

  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);

  //pagenation

  const [page, setPage] = useState(1); // 1 page with are 3 ads at a time
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    loadMore();
  }, [page]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/user-ads/${page}`);
      setAds(data.ads);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const loadMore = async () => {
    try {
      const { data } = await axios.get(`/user-ads/${page}`);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const seller = auth.user?.role?.includes("Seller");
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Dashboard</h1>
      <Sidebar />

      {!seller ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center vh-100 "
            style={{ marginTop: "-10%" }}
          >
            <h2>
              Hello {auth.user?.name ? auth.user?.name : auth.user?.username} ,
              Welcome to my myHommy
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
                <p className="text-center">Total {total} properties found.</p>
              </div>
              <div className="row ">
                {ads?.map((ad) => (
                  <AdUser ad={ad} />
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col text-center mt-4 mb-4">
                <button
                  disabled={loading}
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {" "}
                  {loading
                    ? "Loading ..."
                    : `${ads.length} / ${total} Load More`}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
