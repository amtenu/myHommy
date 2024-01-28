import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useSearch } from "../../context/Search";
import { GOOGLE_PLACES_KEY } from "../../config/config";
export default function SearchForm() {
  //context

  const [search, setSearch] = useSearch();
  return (
    <>
      <div className="container   m-5">
        <div className="row">
          <div className="col-lg-12 form-control">
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions="ca"
              selectProps={{
                defaultInputValue: search?.address,
                placeholder: "Search for address ...",
                onChange: ({ value }) =>
                  setSearch({ ...search, address: value.description }),
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary col-lg-2 square">Buy</button>
          <button className="btn btn-primary col-lg-2 square">Rent</button>
          <button className="btn btn-primary col-lg-2 square">House</button>
          <button className="btn btn-primary col-lg-2 square">Land</button>
          <button className="btn btn-primary col-lg-2 square">Price</button>
          <button className="btn btn-danger col-lg-2 square">Search</button>
        </div>
      </div>
    </>
  );
}
