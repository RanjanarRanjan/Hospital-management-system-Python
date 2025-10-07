// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ViewAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const res = await fetch("http://127.0.0.1:8000/appointments/all/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
           
//           },
//             credentials: "include"
//         });

//         if (!res.ok) {
//           const data = await res.json();
//           throw new Error(data.detail || "Failed to fetch appointments");
//         }

//         const data = await res.json();
//         setAppointments(data);
//       } catch (err) {
//         console.error("Error fetching appointments:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   if (loading) return <p className="text-center text-blue-600 mt-8">Loading appointments...</p>;
//   if (error) return <p className="text-center text-red-600 mt-8">❌ {error}</p>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold text-blue-900">📅 All Appointments</h1>
//         <button
//           onClick={() => navigate("/admin-dashboard")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           ⬅ Back
//         </button>
//       </div>

//       {appointments.length === 0 ? (
//         <p className="text-gray-600">No appointments found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
//           <thead>
//             <tr className="bg-blue-200">
//               <th className="px-4 py-2 border">Patient</th>
//               <th className="px-4 py-2 border">Doctor</th>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Slot</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt.id} className="hover:bg-blue-50">
//                 <td className="px-4 py-2 border">{appt.user_name || "N/A"}</td>
//                 <td className="px-4 py-2 border">{appt.doctor_name || "N/A"}</td>
//                 <td className="px-4 py-2 border">{appt.date}</td>
//                 <td className="px-4 py-2 border">{appt.slot}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default ViewAppointments;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminBg from "../assets/adminbg.jpg";
import logo from "../assets/logo.svg";
import { FaSignOutAlt } from "react-icons/fa";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // ✅ Fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/appointments/all/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to fetch appointments");

      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading)
    return <p className="text-center text-blue-600 mt-8">Loading appointments...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-8">❌ {error}</p>;

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col overflow-hidden"
      style={{ backgroundImage: `url(${adminBg})` }}
    >
      {/* Navbar */}
      <div className="flex items-center justify-between bg-blue-900 bg-opacity-70 p-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Hospital Logo" className="w-12 h-12" />
          <h1 className="text-white text-2xl font-bold">📅 View Appointments</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* Table container */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-2xl w-11/12 max-w-6xl h-[80vh] flex flex-col">
          {/* Header Buttons */}
          <div className="flex justify-start mb-4">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              ⬅ Back
            </button>
          </div>

          {/* Scrollable table */}
          <div className="overflow-y-auto flex-1 border border-gray-300 rounded-lg shadow-inner">
            {appointments.length === 0 ? (
              <p className="text-center p-4 text-gray-600">No appointments found.</p>
            ) : (
              <table className="min-w-full border-collapse text-center">
                <thead className="bg-blue-200 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 border">Patient</th>
                    <th className="px-4 py-2 border">Doctor</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Slot</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-blue-50">
                      <td className="px-4 py-2 border">{appt.user_name || "N/A"}</td>
                      <td className="px-4 py-2 border">{appt.doctor_name || "N/A"}</td>
                      <td className="px-4 py-2 border">{appt.date}</td>
                      <td className="px-4 py-2 border">{appt.slot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAppointments;
