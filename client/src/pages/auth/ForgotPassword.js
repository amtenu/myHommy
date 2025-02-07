import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Login() {
 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); //redirecting

  //hooks

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // const res= await axios.post(`${API}/register`,{email,password});//generic responce so we need data
      const { data } = await axios.post(`/forgot-password`, {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Please check your emaail for password reset link");
        setLoading(false);
        navigate("/");
      }

      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong.Please try again");
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Forgot password</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting ..." : "Submit"}
              </button>
            </form>
            <Link  className="text-danger  "to='/login'>Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
