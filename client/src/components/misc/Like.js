import { useAuth } from "../../context/auth";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";

export default function Like({ ad }) {
  const [auth, setAuth] = useAuth();
  return (
    <>
      {auth.user?.wishlist?.includes(ad?._id) ? (
        <span>
           <FcLike className="h2 mt-3"/>
        </span>
      ) : (
        <span>
         
          <FcLikePlaceholder className="h2 mt-3" />
        </span>
      )}
    </>
  );
}
