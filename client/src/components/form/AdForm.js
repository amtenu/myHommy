import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config/config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
//import { Navigate } from "react-router-dom";

export default function AdForm({ action, type }) {
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carPark: "",
    landsize: "",
    basement: false,
    garage: false,
    title: "",
    description: "",
    loading: false,
    type,
    action
  });

  const handleClick = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = axios.post("/ad", ad);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Advert created sucessfully");

      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <>
      <div className="form-control mb-3">
        <ImageUpload ad={ad} setAd={setAd} />
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
      </div>
      <CurrencyInput
        placeholder="Please Enter price"
        defaultValue={ad.price}
        className="form-control mb-3"
        onValueChange={(value) => setAd({ ...ad, price: value })}
        required
      />
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
      <button onClick={handleClick} className="btn btn-primary">
        Submit
      </button>
      <pre>{JSON.stringify(ad, null, 4)}</pre>
    </>
  );
}
