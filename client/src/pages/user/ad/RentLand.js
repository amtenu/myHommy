import SideBar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/form/AdForm";

export default function RentLand() {
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Rent Land </h1>
      <SideBar />
      <div className="container mt-2">
        <AdForm action="Rent" type="Land" />
      </div>
    </div>
  );
}
