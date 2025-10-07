import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitalBg from "../assets/hospital-bg.jpg"; // same background image

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.fullname.trim()) return "Full name is required";
    if (!emailRegex.test(formData.email)) return "Invalid email address";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    if (!phoneRegex.test(formData.phone))
      return "Phone number must be 10 digits";
    if (!formData.dob) return "Date of birth is required";

    // Optional: check DOB is not future
    const dobDate = new Date(formData.dob);
    if (dobDate > new Date()) return "Date of birth cannot be in the future";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful ✅ Redirecting to login...");

        // Clear inputs
        setFormData({
          fullname: "",
          email: "",
          password: "",
          phone: "",
          dob: "",
          gender: "",
          address: "",
        });

        // Redirect to login after 2 sec
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${hospitalBg})` }}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
          Signup
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Signup
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-blue-900 mt-4">{message}</p>
        )}

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
