import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config/config";
import CurrencyInput from "react-currency-input-field";

export default function AdForm({ action, type }) {
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedroom: "",
    bathroom: "",
    carPark: "",
    landsize: "",
    basement: false,
    garage: false,
    title: "",
    description: "",
    loading: false,
  });
  return (
    <>
      <div className="form-control">
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
      />
      <pre>{JSON.stringify(ad, null, 4)}</pre>
    </>
  );
}
