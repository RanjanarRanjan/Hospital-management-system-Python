import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import adminBg from "../assets/adminbg.jpg";
import logo from "../assets/logo.svg";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/appointments/my/", {
        method: "GET",
        credentials: "include", // send cookies
      });

      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else if (res.status === 401) {
        setMessage("Unauthorized. Please login again.");
        navigate("/login");
      } else {
        setMessage("Failed to fetch appointments ❌");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setMessage("Something went wrong ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/appointments/delete/${id}/`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.success);
        fetchAppointments(); // refresh list
      } else {
        setMessage(data.error || "Failed to delete appointment ❌");
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setMessage("Something went wrong ❌");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${adminBg})` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-900 bg-opacity-70 p-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Hospital Logo" className="w-12 h-12" />
          <h1 className="text-white text-2xl font-bold">User Dashboard</h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate("/user-dashboard")}
            className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            📋 My Appointments
          </h1>
          {message && (
            <p className="text-center text-red-700 font-semibold mb-4">{message}</p>
          )}

          {appointments.length === 0 ? (
            <p className="text-center text-gray-700">No appointments found.</p>
          ) : (
            <table className="w-full border border-gray-300 bg-white">
              <thead className="bg-blue-200">
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Slot</th>
                  <th className="p-2 border">Doctor</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="text-center">
                    <td className="p-2 border">{appt.date}</td>
                    <td className="p-2 border">{appt.slot}</td>
                    <td className="p-2 border">{appt.doctor_name}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAppointments;
