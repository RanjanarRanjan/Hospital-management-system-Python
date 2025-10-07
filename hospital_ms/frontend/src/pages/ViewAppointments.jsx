import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("http://127.0.0.1:8000/appointments/all/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, // ✅ send token
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || "Failed to fetch appointments");
        }

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center text-blue-600 mt-8">Loading appointments...</p>;
  if (error) return <p className="text-center text-red-600 mt-8">❌ {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">📅 All Appointments</h1>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ⬅ Back
        </button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-200">
              <th className="px-4 py-2 border">Patient</th>
              <th className="px-4 py-2 border">Doctor</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Slot</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-blue-50">
                <td className="px-4 py-2 border">{appt.patient_name || "N/A"}</td>
                <td className="px-4 py-2 border">{appt.doctor_name || "N/A"}</td>
                <td className="px-4 py-2 border">{appt.date}</td>
                <td className="px-4 py-2 border">{appt.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewAppointments;
