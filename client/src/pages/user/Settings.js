import { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import Sidebar from "../../components/nav/Sidebar";

export default function Settings() {
  // state

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
     
      setLoading(true);
      const { data } = await axios.put("/update-password", {
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false)
      } else {
        setLoading(false);
        toast.success("New Password updated");  
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="display-1 bg-primary text-light p-5">Settings</h1>
      <div className="container-fluid">
        <Sidebar />
    

        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-2">
           
              <form onSubmit={handlesubmit}>
                
                <input
                  type="password"
                  placeholder="Enter your new password"
                  className="form-control mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
               
                <button
                  className="btn btn-primary col-12 mb-4 mt-2"
                  disabled={loading}
                >
                  {loading ? "Processing" : "Update password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
