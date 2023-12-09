import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Login() {
  //context

  const [auth, setAuth] = useAuth();

  //state to use

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
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem('auth', JSON.stringify(data));
        toast.success("Login Successful");
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
      <h1 className="display-1 bg-primary text-light p-5">Login</h1>
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
              <input
                type="password"
                placeholder="Enter your Password"
                className="form-control mb-4"
                required
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting ..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
