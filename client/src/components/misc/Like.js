import { useAuth } from "../../context/auth";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Like({ ad }) {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post("/wishlist", { adId: ad._id });
      setAuth({ ...auth, user: data });
      const fromLs = JSON.stringify(localStorage.getItem("auth"));
      fromLs.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLs));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {auth.user?.wishlist?.includes(ad?._id) ? (
        <span>
          <FcLike onClick={handleLike} className="h2 mt-3 pointer" />
        </span>
      ) : (
        <span>
          <FcLikePlaceholder
            onClick={handleUnlike}
            className="h2 mt-3 pointer"
          />
        </span>
      )}
    </>
  );
}
