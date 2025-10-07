import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const [date, setDate] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch available doctors for selected date
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!date) return;

      try {
        const res = await fetch(
  `http://127.0.0.1:8000/appointments/available/?date=${date}`,
  {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ send authToken cookie automatically
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
        console.error("Error fetching doctors:", err);
        setMessage("Something went wrong ❌");
      }
    };

    fetchDoctors();
  }, [date]);

  // ✅ Fetch slots when doctor changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!date || !selectedDoctor) return;

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/appointments/slots/?date=${date}&doctor=${selectedDoctor}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // ✅ send authToken cookie automatically
          }
        );

        const data = await res.json();
        if (res.ok) setSlots(data);
        else setMessage(data.error || "Failed to load slots ❌");
      } catch (err) {
        console.error("Error fetching slots:", err);
        setMessage("Something went wrong ❌");
      }
    };

    fetchSlots();
  }, [date, selectedDoctor]);

  // ✅ Book appointment
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
        credentials: "include", // ✅ send authToken cookie automatically
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
      console.error("Booking error:", err);
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">📅 Book Appointment</h1>

      <form onSubmit={handleBook} className="space-y-4">
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
      </form>

      {message && (
        <p className="text-center mt-4 font-semibold text-red-600">{message}</p>
      )}
    </div>
  );
}

export default BookAppointment;
