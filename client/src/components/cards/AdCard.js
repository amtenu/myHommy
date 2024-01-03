import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";

export default function AdCard({ ad }) {
  function format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4">
      <Link to={`/ad/${ad.slug}`}>
        <Badge.Ribbon
          text={`${ad?.type} for ${ad?.action}`}
          color={`${ad?.action === "Sell" ? "red" : "blue"}`}
        >
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

            <AdFeatures Ad={ad} />
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
