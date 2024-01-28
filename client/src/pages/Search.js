
import { useSearch } from "../context/Search";
import SearchForm from "../components/form/SearchForm";
import AdCard from "../components/cards/AdCard";


export default function Search() {
  const [search, setSearch] = useSearch();
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Search</h1>
      <SearchForm />

      <div className="container">
        <div className="row">
          {search.result?.length > 0 ? (
            <div className="col-md-12 text-center p-5 ">Found {search.result.length} result</div>
          ) : (
            <div className="col-md-12 text-center p-5">No Properties Found.</div>
          )}
        </div>
        <div className="row">
          {search.result?.map((item) => (
            <AdCard ad={item}  key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
