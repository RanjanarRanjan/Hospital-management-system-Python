import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import adminBg from "../assets/adminbg.jpg";
import logo from "../assets/logo.svg";

function BookAppointment() {
  const [date, setDate] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Fetch available doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!date) return;

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/appointments/available/?date=${date}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await res.json();
        if (res.ok) {
          setDoctors(data);
          setSelectedDoctor("");
          setSlots([]);
        } else {
          setMessage(data.error || "Failed to load doctors ❌");
        }
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong ❌");
      }
    };

    fetchDoctors();
  }, [date]);

  // Fetch slots when doctor changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!date || !selectedDoctor) return;

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/appointments/slots/?date=${date}&doctor=${selectedDoctor}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await res.json();
        if (res.ok) setSlots(data);
        else setMessage(data.error || "Failed to load slots ❌");
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong ❌");
      }
    };

    fetchSlots();
  }, [date, selectedDoctor]);

  // Book appointment
  const handleBook = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!date || !selectedDoctor || !selectedSlot) {
      setMessage("Please fill all fields ❌");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/appointments/book/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          date,
          doctor: selectedDoctor,
          slot: selectedSlot,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Appointment booked successfully!");
        setTimeout(() => navigate("/user/view-appointments"), 1500);
      } else {
        setMessage(data.error || "Failed to book appointment ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong ❌");
    }
  };

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

      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">📅 Book Appointment</h1>

        <form
          onSubmit={handleBook}
          className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
        >
          <div>
            <label className="block text-blue-900 font-semibold">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-blue-900 font-semibold">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full border p-2 rounded-lg"
              required
            >
              <option value="">-- Choose Doctor --</option>
              {doctors.map((doc, index) => (
                <option key={index} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold">Select Slot</label>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full border p-2 rounded-lg"
              required
            >
              <option value="">-- Choose Slot --</option>
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Book Appointment
          </button>

          {message && (
            <p className="text-center mt-4 font-semibold text-red-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
