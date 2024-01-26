import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../../config/config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/form/ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/nav/Sidebar";

export default function EditAd({ action, type }) {
  //state to hold all the privious data
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    basement: false,
    garage: false,
    title: "",
    description: "",
    loading: false,
    type,
    action,
  });

  //hooks

  const navigate = useNavigate();
  const params = useParams();

  //load the items

  useEffect(() => {
    if (params?.slug) {
      //   console.log("params?.slug =>", params?.slug);
      fetchAds();
    }
  }, [params?.slug]);

  const handleClick = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.put(`/ad/${ad._id}`, ad);
      console.log("Show single page data =>", data);

      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Advert created sucessfully");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
      navigate("/dashboard");
    }
  };

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      //   console.log(data)//data consists of related data as well so need to remove related

      setAd(data?.ad);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5"> Edit Ad</h1>
      <Sidebar />
      <div className="container">
        <div className="form-control mb-3">
          <ImageUpload ad={ad} setAd={setAd} />
          {ad?.address ? (
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions="ca"
              selectProps={{
                defaultInputValue: ad?.address,
                placeholder: "Search for address ...",
                onChange: ({ value }) =>
                  setAd({ ...ad, address: value.description }),
              }}
            />
          ) : (
            ""
          )}
        </div>
        <div style={{ marginTop: "80px" }}>
          {ad?.price ? (
            <CurrencyInput
              placeholder="Please Enter price"
              defaultValue={ad.price}
              className="form-control mb-3"
              onValueChange={(value) => setAd({ ...ad, price: value })}
              required
            />
          ) : (
            ""
          )}
        </div>
        {ad.type === "House" ? (
          <>
            {" "}
            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="How many bedrooms?"
              value={ad.bedrooms}
              onChange={(e) =>
                setAd({
                  ...ad,
                  bedrooms: e.target.value,
                })
              }
            />
            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="How many bathrooms?"
              value={ad.bathrooms}
              onChange={(e) =>
                setAd({
                  ...ad,
                  bathrooms: e.target.value,
                })
              }
            />
            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="How many carparks?"
              value={ad.carpark}
              onChange={(e) =>
                setAd({
                  ...ad,
                  carpark: e.target.value,
                })
              }
            />
          </>
        ) : (
          ""
        )}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Land size?"
          value={ad.landsize}
          onChange={(e) =>
            setAd({
              ...ad,
              landsize: e.target.value,
            })
          }
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter title?"
          value={ad.title}
          onChange={(e) =>
            setAd({
              ...ad,
              title: e.target.value,
            })
          }
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description?"
          value={ad.description}
          onChange={(e) =>
            setAd({
              ...ad,
              description: e.target.value,
            })
          }
        />
        <button
          onClick={handleClick}
          className={`btn btn-primary mb-5 ${ad.loading ? "disabled" : ""} `}
        >
          {ad.loading ? "Saving ...." : "Submit"}
        </button>

        {/*<pre>{JSON.stringify(ad, null, 4)}</pre>*/}
      </div>
    </div>
  );
}
