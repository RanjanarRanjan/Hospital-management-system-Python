import { Link, useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import adminBg from "../assets/adminbg.jpg";
import logo from "../assets/logo.svg";

function Admindashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT from localStorage
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Example: Fetch protected route using token
  const fetchDoctors = async () => {
    const token = localStorage.getItem("authToken");
    const res = await fetch("http://127.0.0.1:8000/doctor/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // ✅ send JWT in header
      },
    });
    const data = await res.json();
    console.log("Doctors:", data);
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${adminBg})` }}
    >
      <div className="flex items-center justify-between bg-blue-900 bg-opacity-70 p-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Hospital Logo" className="w-12 h-12" />
          <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <Link
          to="/add-doctor"
          className="flex items-center bg-white shadow-lg rounded-lg p-4 w-64 hover:bg-blue-100"
        >
          <FaUserMd className="text-blue-700 text-2xl mr-3" />
          <span className="text-blue-900 font-semibold">Add Doctors</span>
        </Link>

        <button
          onClick={() => navigate("/admin/view-doctors")}
          className="flex items-center bg-white shadow-lg rounded-lg p-4 w-64 hover:bg-blue-100"
        >
          <FaUsers className="text-blue-700 text-2xl mr-3" />
          <span className="text-blue-900 font-semibold">View Doctors</span>
        </button>

        <button
          onClick={() => navigate("/admin/view-appointments")}
          className="flex items-center bg-white shadow-lg rounded-lg p-4 w-64 hover:bg-blue-100"
        >
          <FaCalendarCheck className="text-blue-700 text-2xl mr-3" />
          <span className="text-blue-900 font-semibold">View Appointments</span>
        </button>
      </div>
    </div>
  );
}

export default Admindashboard;
