// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ViewDoctors() {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ✅ Fetch doctors using cookie-based JWT
//   const fetchDoctors = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/doctor/list/", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // send HttpOnly cookie
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to fetch doctors");

//       setDoctors(data);
//     } catch (err) {
//       console.error("Error fetching doctors:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   // ✅ Delete doctor
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this doctor?")) return;

//     try {
//       const res = await fetch(`http://127.0.0.1:8000/doctor/delete/${id}/`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to delete doctor");

//       alert("Doctor deleted successfully");
//       fetchDoctors();
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert(err.message);
//     }
//   };

//   if (loading) return <p className="text-center text-blue-600 mt-8">Loading doctors...</p>;
//   if (error) return <p className="text-center text-red-600 mt-8">❌ {error}</p>;

//   return (
//     <div className="p-6">
//       {/* Header + Buttons */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold text-blue-900">👨‍⚕️ Doctors List</h1>
//         <div className="space-x-2">
//           <button
//             onClick={() => navigate("/admin-dashboard")}
//             className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
//           >
//             ⬅ Back
//           </button>
//           <button
//             onClick={() => navigate("/add-doctor")}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             ➕ Add Doctor
//           </button>
//         </div>
//       </div>

//       {/* Table Section */}
//       {doctors.length === 0 ? (
//         <p className="text-gray-600">No doctors available.</p>
//       ) : (
//         <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
//           <table className="min-w-full">
//             <thead className="bg-blue-200 sticky top-0">
//               <tr>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Email</th>
//                 <th className="px-4 py-2 border">Available Days</th>
//                 <th className="px-4 py-2 border">Available Slots</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {doctors.map((doctor) => (
//                 <tr key={doctor.id} className="hover:bg-blue-50">
//                   <td className="px-4 py-2 border">{doctor.name}</td>
//                   <td className="px-4 py-2 border">{doctor.email}</td>
//                   <td className="px-4 py-2 border">{doctor.available_days}</td>
//                   <td className="px-4 py-2 border">{doctor.available_slots}</td>
//                   <td className="px-4 py-2 border space-x-2">
//                     <button
//                       onClick={() => handleDelete(doctor.id)}
//                       className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewDoctors;



















import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminBg from "../assets/adminbg.jpg";
import logo from "../assets/logo.svg";
import { FaSignOutAlt } from "react-icons/fa";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // ✅ Fetch doctors
  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/doctor/list/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch doctors");

      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/doctor/delete/${id}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete doctor");

      alert("Doctor deleted successfully");
      fetchDoctors();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.message);
    }
  };

  if (loading)
    return <p className="text-center text-blue-600 mt-8">Loading doctors...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-8">❌ {error}</p>;

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col overflow-hidden"
      style={{ backgroundImage: `url(${adminBg})` }}
    >
      {/* ✅ Navbar */}
      <div className="flex items-center justify-between bg-blue-900 bg-opacity-70 p-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Hospital Logo" className="w-12 h-12" />
          <h1 className="text-white text-2xl font-bold">View Doctors</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* ✅ Table container - larger area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-2xl w-11/12 max-w-6xl h-[80vh] flex flex-col">
          {/* Header Buttons */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              ⬅ Back
            </button>
            <button
              onClick={() => navigate("/add-doctor")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              ➕ Add Doctor
            </button>
          </div>

          {/* ✅ Scrollable table only */}
          <div className="overflow-y-auto flex-1 border border-gray-300 rounded-lg shadow-inner">
            {doctors.length === 0 ? (
              <p className="text-gray-600 p-4">No doctors available.</p>
            ) : (
              <table className="min-w-full border-collapse text-center">
                <thead className="bg-blue-200 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Available Days</th>
                    <th className="px-4 py-2 border">Available Slots</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-blue-50">
                      <td className="px-4 py-2 border">{doctor.name}</td>
                      <td className="px-4 py-2 border">{doctor.email}</td>
                      <td className="px-4 py-2 border">{doctor.available_days}</td>
                      <td className="px-4 py-2 border">{doctor.available_slots}</td>
                      <td className="px-4 py-2 border">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              navigate(`/admin/update-doctor/${doctor.id}`)
                            }
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(doctor.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
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

export default ViewDoctors;
