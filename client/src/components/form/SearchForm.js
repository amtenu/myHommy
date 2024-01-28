/* eslint-disable jsx-a11y/anchor-is-valid */

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useSearch } from "../../context/Search";
import { GOOGLE_PLACES_KEY } from "../../config/config";
import { sellPrices, rentPrices } from "../../helpers/PriceList";
import { GrCheckboxSelected } from "react-icons/gr";
import axios from "axios";

import queryString from "query-string";
import { useNavigate } from "react-router-dom";



export default function SearchForm() {
  //context

  const [search, setSearch] = useSearch();

  //hooks

  const navigate = useNavigate();

  const handleSearch = async () => {
    setSearch({ ...search, loading: false });
    try {
      const { result, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      const { data } = await axios.get(`/search?${query}`);
      if (search?.page !== "/search") {
        setSearch((prev) => ({ ...prev, result: data, loading: false }));
        navigate('/search')
      } else {
        setSearch((prev) => ({ ...prev, result: data, page:window.location.pathname,loading: false }));
      }
    } catch (err) {
      console.log(err);
      setSearch({ ...search, loading: false });
    }
  };

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
          <button
            className="btn btn-primary col-lg-2 square"
            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
          >
            {search.action === "Buy" ? (
              <>
                <GrCheckboxSelected /> BUY
              </>
            ) : (
              "Buy"
            )}
          </button>
          <button
            className="btn btn-primary col-lg-2 square"
            onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
          >
            {search.action === "Rent" ? (
              <>
                <GrCheckboxSelected /> RENT
              </>
            ) : (
              "RENT"
            )}
          </button>
          <button
            className="btn btn-primary col-lg-2 square"
            onClick={() => setSearch({ ...search, type: "House", price: "" })}
          >
            {search.type === "House" ? (
              <>
                <GrCheckboxSelected /> HOUSE
              </>
            ) : (
              "HOUSE"
            )}
          </button>
          <button
            className="btn btn-primary col-lg-2 square"
            onClick={() => setSearch({ ...search, type: "Land", price: "" })}
          >
            {search.type === "Land" ? (
              <>
                <GrCheckboxSelected /> LAND
              </>
            ) : (
              "LAND"
            )}
          </button>
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              &nbsp; {search?.price ? search.price : "Price"}
            </button>
            <ul className="dropdown-menu">
              {search.action === "Buy" ? (
                <>
                  {sellPrices?.map((p) => (
                    <li key={p._id}>
                      <a
                        className="dropdown-item"
                        onClick={() =>
                          setSearch({
                            ...search,
                            price: p.name,
                            priceRange: p.array,
                          })
                        }
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {rentPrices?.map((p) => (
                    <li key={p._id}>
                      <a
                        className="dropdown-item"
                        onClick={() =>
                          setSearch({
                            ...search,
                            price: p.name,
                            priceRange: p.array,
                          })
                        }
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <button
            onClick={handleSearch}
            className="btn btn-danger col-lg-2 square"
          >
            Search
          </button>
        </div>
      </div>
    </>

   
  );
}
