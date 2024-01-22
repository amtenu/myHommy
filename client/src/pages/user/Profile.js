import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Sidebar from "../../components/nav/Sidebar";

import ProfilePhotoUpload from "../../components/form/ProfilePhotoUpload";
export default function Profile() {
  //context
  const [auth, setAuth] = useAuth();

  // state

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  // hooks

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setUsername(auth.user?.username);
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setCompany(auth.user?.company);
      setAddress(auth.user?.address);
      setPhone(auth.user?.phone);
      setAbout(auth.user?.about);
      setPhoto(auth.user?.photo);
    }
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/update-profile", {
        username,
        name,
        email,
        company,
        address,
        phone,
        about,
        photo,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);
        toast.success("Profile updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="display-1 bg-primary text-light p-5">Profile</h1>
      <div className="container-fluid">
        <Sidebar />

        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-2">
              <ProfilePhotoUpload
                photo={photo}
                setPhoto={setPhoto}
                uploading={uploading}
                setUploading={setUploading}
              />
              <form onSubmit={handlesubmit}>
                <input
                  type="text"
                  placeholder="Update your username"
                  className="form-control mb-4"
                  value={username}
                  onChange={(e) =>
                    setUsername(slugify(e.target.value.toLocaleLowerCase()))
                  } //Slugify uses to remove whitespace
                />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-control mb-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control  mb-4"
                  disabled={true}
                  value={email}
                />
                <input
                  type="text"
                  placeholder="Enter your company name"
                  className="form-control mb-4"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Enter your address"
                  className="form-control mb-4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="form-control mb-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  placeholder="Enter any interesting information about yourself"
                  className="form-control mb-4"
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                  maxLength={200}
                />
                <button
                  className="btn btn-primary col-12 mb-4 mt-2"
                  disabled={loading}
                >
                  {loading ? "Processing" : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
