import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function ContactSeller({ ad }) {
  //context

  const [auth, setAuth] = useAuth();

  //state

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");

  // hooks

  const navigate = useNavigate();

  const LoggedIn = auth.user !== null && auth.token !== "";

  useEffect(() => {
    if (auth?.user) {
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setPhone(auth.user?.phone);
    }
  }, [LoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.post("/contact-seller", {
        name,
        email,
        message,
        phone,
        adId: ad._id,
      });

      if (data?.error) {
        toast.error(data.error);
        setLoading(false)
      } else {
        setLoading(false)
        toast.success("Your enquiry has been sent to seller")
        setMessage('')
      
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.Try again!!");
      setLoading(false)
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h3>
            Contact{" "}
            {ad?.postedBy?.name ? ad?.postedBy?.name : ad?.postedBy?.username}
          </h3>
          <form onSubmit={handleSubmit}>
            <textarea
              name="message"
              placeholder="Please write your message here"
              className="form-control"
              value={message}
              autoFocus={true}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!LoggedIn}
            ></textarea>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Please enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!LoggedIn}
            ></input>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => e.target.value}
              disabled={!LoggedIn}
            ></input>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Please enter your phone no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!LoggedIn}
            ></input>

            <button
              className="btn btn-primary mb-3 mt-3"
              disabled={!name || !email || loading}
            >
              {LoggedIn
                ? loading
                  ? "Please wait "
                  : "Send enquiry"
                : "Login in to send enquiry"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
