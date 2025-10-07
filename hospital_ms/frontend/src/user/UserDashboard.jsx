import { Link, useNavigate } from "react-router-dom";
import { FaCalendarPlus, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import adminBg from "../assets/adminbg.jpg"; // ✅ you can use same background
import logo from "../assets/logo.svg";

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT from localStorage
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${adminBg})` }}
    >
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-blue-900 bg-opacity-70 p-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Hospital Logo" className="w-12 h-12" />
          <h1 className="text-white text-2xl font-bold">User Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        {/* Book Appointment */}
        <Link
          to="/user/book-appointment"
          className="flex items-center bg-white shadow-lg rounded-lg p-4 w-64 hover:bg-blue-100"
        >
          <FaCalendarPlus className="text-blue-700 text-2xl mr-3" />
          <span className="text-blue-900 font-semibold">Book Appointment</span>
        </Link>

        {/* View Appointments */}
        <button
          onClick={() => navigate("/user/view-appointments")}
          className="flex items-center bg-white shadow-lg rounded-lg p-4 w-64 hover:bg-blue-100"
        >
          <FaCalendarCheck className="text-blue-700 text-2xl mr-3" />
          <span className="text-blue-900 font-semibold">View Appointments</span>
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
