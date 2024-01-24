import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";

export default function Home() {
  const [auth, setAuth] = useAuth();

  const seller = auth.user?.role?.includes("Seller");
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Dashboard</h1>
      <Sidebar />

      {!seller ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center vh-100 "
            style={{ marginTop: "-10%" }}
          >
            <h2>
              Hello {auth.user?.name ? auth.user?.name : auth.user?.username} ,
              Welcome to my myHommy
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div>
                <>
                  <h2>List of advertisments</h2>
                  <hr />
                </>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
