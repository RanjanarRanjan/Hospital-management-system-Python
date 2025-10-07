import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch doctors using cookie-based JWT
  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/doctor/list/", { // <-- match backend
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send HttpOnly cookie
      });

      const data = await res.json(); // call json() once

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch doctors");
      }

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
      fetchDoctors(); // refresh list
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center text-blue-600 mt-8">Loading doctors...</p>;
  if (error) return <p className="text-center text-red-600 mt-8">❌ {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">👨‍⚕️ Doctors List</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
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
      </div>

      {doctors.length === 0 ? (
        <p className="text-gray-600">No doctors available.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-200">
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
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700"
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
  );
}

export default ViewDoctors;
