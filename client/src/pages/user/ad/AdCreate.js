import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/nav/Sidebar";

export default function AdCreate() {
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);

  const navigate = useNavigate();

  const handleRent = () => {
    setSell(false);
    setRent(true);
  };
  const handleSell = () => {
    setSell(true);
    setRent(false);
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Dashboard</h1>
      <Sidebar />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-14%" }}
      >
        <div className="col-lg-6">
          <button
            onClick={handleRent}
            className="btn btn-primary btn-lg col-12 p-5"
          >
            Rent
          </button>
          {rent && " Show rent house or land option"}
        </div>
        
        <div className="col-lg-6">
          <button
            onClick={handleSell}
            className="btn btn-primary btn-lg col-12 p-5"
          >
            Sell
          </button>
          {sell && "Show sell house or land option"}
        </div>
        
      </div>
    </div>
  );
}
