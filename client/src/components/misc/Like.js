import { useAuth } from "../../context/auth";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Like({ ad }) {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const handleLike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.post("/wishlist", { adId: ad._id });
      setAuth({ ...auth, user: data });
      const fromLs = JSON.parse(localStorage.getItem("auth"));
      fromLs.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLs));
      toast.success("Property added to list");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }
      const { data } = await axios.delete(`/wishlist/${ad._id}`);
      setAuth({ ...auth, user: data });
      const fromLs = JSON.parse(localStorage.getItem("auth"));
      fromLs.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLs));
      toast.success("Property removed from list");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {auth.user?.wishlist?.includes(ad?._id) ? (
        <span>
          <FcLike onClick={handleUnlike} className="h2 mt-3 pointer" />
        </span>
      ) : (
        <span>
          <FcLikePlaceholder onClick={handleLike} className="h2 mt-3 pointer" />
        </span>
      )}
    </>
  );
}
