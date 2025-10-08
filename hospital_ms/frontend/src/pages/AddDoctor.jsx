// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation, useParams } from "react-router-dom";

// // const AddDoctor = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     available_days: [],
// //     available_slots: [],
// //   });
// //   const [slotHour, setSlotHour] = useState("");
// //   const [slotPeriod, setSlotPeriod] = useState("AM");
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { id } = useParams(); // doctor id if editing

// //   const isEditing = location.pathname.includes("edit-doctor");

// //   // ✅ Pre-fill when editing
// //   useEffect(() => {
// //     if (isEditing && location.state) {
// //       const doctor = location.state;
// //       setFormData({
// //         name: doctor.name,
// //         email: doctor.email,
// //         available_days: doctor.available_days.split(", ").map((d) => d.trim()),
// //         available_slots: doctor.available_slots.split(", ").map((s) => s.trim()),
// //       });
// //     }
// //   }, [isEditing, location.state]);

// //   const daysOfWeek = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

// //   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const handleCheckboxChange = (day) => {
// //     setFormData((prev) => {
// //       const updatedDays = prev.available_days.includes(day)
// //         ? prev.available_days.filter((d) => d !== day)
// //         : [...prev.available_days, day];
// //       return { ...prev, available_days: updatedDays };
// //     });
// //   };

// //   const handleAddSlot = () => {
// //     if (!slotHour) return;
// //     const newSlot = `${slotHour} ${slotPeriod}`;
// //     if (!formData.available_slots.includes(newSlot)) {
// //       setFormData((prev) => ({ ...prev, available_slots: [...prev.available_slots, newSlot] }));
// //     }
// //     setSlotHour("");
// //     setSlotPeriod("AM");
// //   };

// //   const handleRemoveSlot = (slot) => {
// //     setFormData((prev) => ({ ...prev, available_slots: prev.available_slots.filter((s) => s !== slot) }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const payload = {
// //         ...formData,
// //         available_days: formData.available_days.join(", "),
// //         available_slots: formData.available_slots.join(", "),
// //       };

// //       const token = localStorage.getItem("authToken");
// //       const url = isEditing
// //         ? `http://127.0.0.1:8000/doctor/update/${id}/`
// //         : "http://127.0.0.1:8000/doctor/add/";

// //       const res = await fetch(url, {
// //         method: isEditing ? "PUT" : "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(payload),
// //         credentials: "include"

// //       });

// //       const data = await res.json();
// //       if (res.ok) {
// //         setMessage(data.message || (isEditing ? "Doctor updated successfully" : "Doctor added successfully"));
// //         setTimeout(() => navigate("/admin/view-doctors"), 1500);
// //       } else {
// //         setMessage(data.error || "Failed to save doctor");
// //       }
// //     } catch (err) {
// //       console.error("Error:", err);
// //       setMessage("Something went wrong");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
// //       <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
// //         {/* ✅ Back Button */}
// //         <button
// //           onClick={() => navigate(-1)} // go back to previous page
// //           className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
// //         >
// //           ⬅ Back
// //         </button>

// //         <h2 className="text-2xl font-bold text-center mb-6">
// //           {isEditing ? "Update Doctor" : "Add Doctor"}
// //         </h2>

// //         {message && <p className="text-center mb-4 text-sm text-blue-600">{message}</p>}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <input type="text" name="name" placeholder="Doctor Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
// //           <input type="email" name="email" placeholder="Doctor Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required />

// //           {/* Days */}
// //           <div>
// //             <p className="font-medium mb-2">Available Days</p>
// //             <div className="grid grid-cols-2 gap-2">
// //               {daysOfWeek.map((day) => (
// //                 <label key={day} className="flex items-center gap-2">
// //                   <input type="checkbox" checked={formData.available_days.includes(day)} onChange={() => handleCheckboxChange(day)} className="w-4 h-4" />
// //                   {day.charAt(0).toUpperCase() + day.slice(1)}
// //                 </label>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Slots */}
// //           <div>
// //             <p className="font-medium mb-2">Available Slots</p>
// //             <div className="flex gap-2">
// //               <select value={slotHour} onChange={(e) => setSlotHour(e.target.value)} className="p-2 border rounded-lg flex-1">
// //                 <option value="">Select Hour</option>
// //                 {[...Array(12).keys()].map((h) => (
// //                   <option key={h + 1} value={h + 1}>{h + 1}</option>
// //                 ))}
// //               </select>
// //               <select value={slotPeriod} onChange={(e) => setSlotPeriod(e.target.value)} className="p-2 border rounded-lg">
// //                 <option value="AM">AM</option>
// //                 <option value="PM">PM</option>
// //               </select>
// //               <button type="button" onClick={handleAddSlot} className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700">Add</button>
// //             </div>

// //             <div className="mt-2 flex flex-wrap gap-2">
// //               {formData.available_slots.map((slot) => (
// //                 <span key={slot} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
// //                   {slot}
// //                   <button type="button" onClick={() => handleRemoveSlot(slot)} className="text-red-500 hover:text-red-700">✕</button>
// //                 </span>
// //               ))}
// //             </div>
// //           </div>

// //           <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
// //             {isEditing ? "Update Doctor" : "Add Doctor"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddDoctor;
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import adminBg from "../assets/adminbg.jpg";
// import logo from "../assets/logo.svg";
// import { FaSignOutAlt } from "react-icons/fa";

// const AddDoctor = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     available_days: [],
//     available_slots: [],
//   });
//   const [slotHour, setSlotHour] = useState("");
//   const [slotPeriod, setSlotPeriod] = useState("AM");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams();

//   const isEditing = location.pathname.includes("update-doctor");

//   // ✅ Pre-fill when editing
//   useEffect(() => {
//     if (isEditing && location.state) {
//       const doctor = location.state;
//       setFormData({
//         name: doctor.name,
//         email: doctor.email,
//         available_days: doctor.available_days.split(", ").map((d) => d.trim()),
//         available_slots: doctor.available_slots.split(", ").map((s) => s.trim()),
//       });
//     }
//   }, [isEditing, location.state]);

//   const daysOfWeek = [
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//     "saturday",
//     "sunday",
//   ];

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleCheckboxChange = (day) => {
//     setFormData((prev) => {
//       const updatedDays = prev.available_days.includes(day)
//         ? prev.available_days.filter((d) => d !== day)
//         : [...prev.available_days, day];
//       return { ...prev, available_days: updatedDays };
//     });
//   };

//   const handleAddSlot = () => {
//     if (!slotHour) return;
//     const newSlot = `${slotHour}${slotPeriod.toLowerCase()}`;
//     if (!formData.available_slots.includes(newSlot)) {
//       setFormData((prev) => ({
//         ...prev,
//         available_slots: [...prev.available_slots, newSlot],
//       }));
//     }
//     setSlotHour("");
//     setSlotPeriod("AM");
//   };

//   const handleRemoveSlot = (slot) => {
//     setFormData((prev) => ({
//       ...prev,
//       available_slots: prev.available_slots.filter((s) => s !== slot),
//     }));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         available_days: formData.available_days.join(", "),
//         available_slots: formData.available_slots.join(", "),
//       };

//       const url = isEditing
//         ? `http://127.0.0.1:8000/doctor/update/${id}/`
//         : "http://127.0.0.1:8000/doctor/add/";

//       const res = await fetch(url, {
//         method: isEditing ? "PUT" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage(
//           data.message ||
//             (isEditing
//               ? "Doctor updated successfully"
//               : "Doctor added successfully")
//         );
//         setTimeout(() => navigate("/admin/view-doctors"), 1500);
//       } else {
//         setMessage(data.error || "Failed to save doctor");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setMessage("Something went wrong");
//     }
//   };

//   return (
//     <div
//       className="h-screen w-screen bg-cover bg-center flex flex-col overflow-hidden"
//       style={{ backgroundImage: `url(${adminBg})` }}
//     >
//       {/* ✅ Navbar */}
//       <div className="flex items-center justify-between bg-blue-900 bg-opacity-70 p-4">
//         <div className="flex items-center space-x-3">
//           <img src={logo} alt="Hospital Logo" className="w-12 h-12" />
//           <h1 className="text-white text-2xl font-bold">
//             {isEditing ? "Update Doctor" : "Add Doctor"}
//           </h1>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
//         >
//           <FaSignOutAlt className="mr-2" /> Logout
//         </button>
//       </div>

//       {/* ✅ Form Box */}
//       <div className="flex flex-1 justify-center items-center">
//         <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl w-full max-w-lg p-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-gray-400 text-white px-2 py-2 rounded-lg hover:bg-gray-500"
//           >
//             ⬅ Back
//           </button>

//           <h2 className="text-2xl font-bold text-center mb-2 text-blue-900">
//             {isEditing ? "Update Doctor Details" : "Add New Doctor"}
//           </h2>

//           {message && (
//             <p className="text-center mb-4 text-blue-700 font-medium">
//               {message}
//             </p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Doctor Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Doctor Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />

//             {/* Days */}
//             <div>
//               <p className="font-medium mb-2 text-blue-900">Available Days</p>
//               <div className="grid grid-cols-4 gap-2">
//                 {daysOfWeek.map((day) => (
//                   <label key={day} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.available_days.includes(day)}
//                       onChange={() => handleCheckboxChange(day)}
//                       className="w-4 h-4"
//                     />
//                     {day.charAt(0).toUpperCase() + day.slice(1)}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Slots */}
//             <div>
//               <p className="font-medium mb-2 text-blue-900">Available Slots</p>
//               <div className="flex gap-2">
//                 <select
//                   value={slotHour}
//                   onChange={(e) => setSlotHour(e.target.value)}
//                   className="p-2 border rounded-lg flex-1"
//                 >
//                   <option value="">Select Hour</option>
//                   {[...Array(12).keys()].map((h) => (
//                     <option key={h + 1} value={h + 1}>
//                       {h + 1}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={slotPeriod}
//                   onChange={(e) => setSlotPeriod(e.target.value)}
//                   className="p-2 border rounded-lg"
//                 >
//                   <option value="AM">AM</option>
//                   <option value="PM">PM</option>
//                 </select>
//                 <button
//                   type="button"
//                   onClick={handleAddSlot}
//                   className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
//                 >
//                   Add
//                 </button>
//               </div>

//               <div className="mt-3 flex flex-wrap gap-2">
//                 {formData.available_slots.map((slot) => (
//                   <span
//                     key={slot}
//                     className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
//                   >
//                     {slot}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveSlot(slot)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             >
//               {isEditing ? "Update Doctor" : "Add Doctor"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDoctor;
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import adminBg from "../assets/adminbg.jpg";
import logo from "../assets/logo.svg";
import { FaSignOutAlt } from "react-icons/fa";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    available_days: [],
    available_slots: [],
  });
  const [slotHour, setSlotHour] = useState("");
  const [slotPeriod, setSlotPeriod] = useState("AM");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEditing = location.pathname.includes("update-doctor");

  // ✅ Pre-fill doctor data
  useEffect(() => {
    if (isEditing && location.state) {
      const doctor = location.state;
      setFormData({
        name: doctor.name,
        email: doctor.email,
        available_days: doctor.available_days
          ? doctor.available_days.split(", ").map((d) => d.trim())
          : [],
        available_slots: doctor.available_slots
          ? doctor.available_slots.split(", ").map((s) => s.trim())
          : [],
      });
    }
    // ✅ Fallback if page refreshed or direct URL open
    else if (isEditing && id) {
      const fetchDoctor = async () => {
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/doctor/detail/${id}/`,
            { credentials: "include" }
          );
          const data = await res.json();
          if (res.ok) {
            setFormData({
              name: data.name,
              email: data.email,
              available_days: data.available_days
                ? data.available_days.split(", ").map((d) => d.trim())
                : [],
              available_slots: data.available_slots
                ? data.available_slots.split(", ").map((s) => s.trim())
                : [],
            });
          }
        } catch (err) {
          console.error("Error fetching doctor details:", err);
        }
      };
      fetchDoctor();
    }
  }, [isEditing, location.state, id]);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (day) => {
    setFormData((prev) => {
      const updatedDays = prev.available_days.includes(day)
        ? prev.available_days.filter((d) => d !== day)
        : [...prev.available_days, day];
      return { ...prev, available_days: updatedDays };
    });
  };

  const handleAddSlot = () => {
    if (!slotHour) return;
    const newSlot = `${slotHour} ${slotPeriod}`;
    if (!formData.available_slots.includes(newSlot)) {
      setFormData((prev) => ({
        ...prev,
        available_slots: [...prev.available_slots, newSlot],
      }));
    }
    setSlotHour("");
    setSlotPeriod("AM");
  };

  const handleRemoveSlot = (slot) => {
    setFormData((prev) => ({
      ...prev,
      available_slots: prev.available_slots.filter((s) => s !== slot),
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        available_days: formData.available_days.join(", "),
        available_slots: formData.available_slots.join(", "),
      };

      const url = isEditing
        ? `http://127.0.0.1:8000/doctor/update/${id}/`
        : "http://127.0.0.1:8000/doctor/add/";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(
          data.message ||
            (isEditing
              ? "Doctor updated successfully"
              : "Doctor added successfully")
        );
        setTimeout(() => navigate("/admin/view-doctors"), 1500);
      } else {
        setMessage(data.error || "Failed to save doctor");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col overflow-hidden"
      style={{ backgroundImage: `url(${adminBg})` }}
    >
      {/* ✅ Navbar */}
      <div className="flex items-center justify-between bg-blue-900 bg-opacity-70 p-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Hospital Logo" className="w-12 h-12" />
          <h1 className="text-white text-2xl font-bold">
            {isEditing ? "Update Doctor" : "Add Doctor"}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* ✅ Form */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl w-full max-w-lg p-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-2 py-2 rounded-lg hover:bg-gray-500"
          >
            ⬅ Back
          </button>

          <h2 className="text-2xl font-bold text-center mb-2 text-blue-900">
            {isEditing ? "Update Doctor Details" : "Add New Doctor"}
          </h2>

          {message && (
            <p className="text-center mb-4 text-blue-700 font-medium">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Doctor Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />

            {/* ✅ Days */}
            <div>
              <p className="font-medium mb-2 text-blue-900">Available Days</p>
              <div className="grid grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.available_days.includes(day)}
                      onChange={() => handleCheckboxChange(day)}
                      className="w-4 h-4"
                    />
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* ✅ Slots */}
            <div>
              <p className="font-medium mb-2 text-blue-900">Available Slots</p>
              <div className="flex gap-2">
                <select
                  value={slotHour}
                  onChange={(e) => setSlotHour(e.target.value)}
                  className="p-2 border rounded-lg flex-1"
                >
                  <option value="">Select Hour</option>
                  {[...Array(12).keys()].map((h) => (
                    <option key={h + 1} value={h + 1}>
                      {h + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={slotPeriod}
                  onChange={(e) => setSlotPeriod(e.target.value)}
                  className="p-2 border rounded-lg"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {formData.available_slots.map((slot) => (
                  <span
                    key={slot}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {slot}
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(slot)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
