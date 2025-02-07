import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../../components/cards/UserCard";
import AdCard from "../../components/cards/AdCard";
export default function AgentProfile() {
  const [agent, setAgent] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    if (params?.username) fetchAgentInfo();
  }, [params?.username]);

  const fetchAgentInfo = async () => {
    try {
      const { data } = await axios.get(`/agent/${params.username}`);
      console.log("Data", data);
      setAgent(data.user);

      setAds(data.adverts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 "
        style={{ marginTop: "-10%" }}
      >
        <div className="display-1">Loading ...</div>{" "}
      </div>
    );
  }

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">
        {agent?.name ?? agent?.username}
      </h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4" />
          <UserCard user={agent} />
          <div className="col-lg-4" />
        </div>
      </div>
      <h2 className="text-center m-5"> Recent Listings</h2>
      <div className="container">
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
