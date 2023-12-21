import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";

export default function AdCard({ ad }) {
  function format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4">
      <div className="Card hoverable shadow">
        <img
          src={ad?.photos?.[0].Location}
          alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
          style={{ height: "250px", objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <h3>CAD&nbsp;{format(ad?.price)}</h3>
        <p>{ad?.address}</p>

        <p className="card-text d-flex justify-content-between">
          {ad?.bedrooms ? (
            <span>
              <IoBedOutline /> {ad?.bedrooms}
            </span>
          ) : (
            ""
          )}{" "}
          {ad?.bathrooms ? (
            <span>
              <TbBath /> {ad?.bathrooms}
            </span>
          ) : (
            ""
          )}{" "}
          {ad?.landsize ? (
            <span>
              <BiArea /> {ad?.landsize}
            </span>
          ) : (
            ""
          )}{" "}
        </p>
      </div>
    </div>
  );
}
