import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function AccountActivate() {
  const [auth, setAuth] = useAuth();

  const params = useParams();
  const token = params.token;
  console.log(token);

  const activationRequest = async () => {
    try {
      const { data } = await axios.post(`/register`, { token }); //req.body
      if (data?.error) {
        toast.error("data.error");
      } else {
        setAuth(data);
        toast.success("Successfully logged in , Welcome to myHommy App");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong,Try again.");
    }
  };

  useEffect(() => {
    if (token) activationRequest();
  }, [token]);

  const navigate = useNavigate();

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100 "
      style={{ marginTop: "-5%" }}
    >
      Please wait .......
    </div>
  );
}
