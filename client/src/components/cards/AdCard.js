export default function AdCard({ ad }) {
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4">
      <div className="Card hoverable shadow">
        <img
          src={ad?.photos?.[0].Location}
          alt={`${ad?.type}-${ad?.adress}-${ad?.action}-${ad?.price}`}
          style={{ height: "250px", objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
            <h3>{ad?.price}</h3>
        </div>
        <p>Ad features </p>
      </div>
    </div>
  );
}
