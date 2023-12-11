import SideBar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/form/AdForm";

export default function SellHouse() {
  return (
    <div>
      <h1 className="dispaly-1 bg-primary text-light p-5">Sell House </h1>
      <SideBar />
      <div classname="container mt-2">
        <AdForm action="Sell" type="House" />
      </div>
    </div>
  );
}
