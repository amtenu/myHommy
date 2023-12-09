import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function AccessAccount() {
  const [auth, setAuth] = useAuth();

  const params = useParams();
  const token = params.token;
  console.log(token);


  useEffect(() => {
    if (token) accessRequest();
  }, [token]);

  const navigate = useNavigate();

  const accessRequest = async () => {
    try {
      const { data } = await axios.post(`/access-account`, { resetCode :token}); //req.body
      if (data?.error) {
        toast.error("data.error");
      } else {
        //To do , We have to save the state
        //save in local storage
        localStorage.setItem('auth',JSON.stringify(data));
        setAuth(data);
        toast.success("Please update your password in profile page");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong,Try again.");
    }
  };

  

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100 "
      style={{ marginTop: "-5%" }}
    >
      Please wait .......
    </div>
  );
}
