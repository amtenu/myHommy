import Sidebar from "../../components/nav/Sidebar";
export default function Profile() {
  return (
    <>
      <h1 className="display-1 bg-primary text-light p-5">Profile</h1>
      <div className="container-fluid">
        <Sidebar />
        <div className="container mt-2">Profile Update form</div>
      </div>
    </>
  );
}
