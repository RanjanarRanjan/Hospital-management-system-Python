import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitalBg from "../assets/hospital-bg.jpg";
import logo from "../assets/logo.svg";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

//  const handleLogin = async (e) => {
//   e.preventDefault();
//   setMessage("");

//   try {
//     const res = await fetch("http://127.0.0.1:8000/auth/login/", {  // <-- backend endpoint
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include", // important to store HttpOnly cookie
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (res.ok && data.success) {
//       setMessage(data.message || "Login successful ✅");

//       // Redirect based on role
//       if (data.role === "admin") {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/user-dashboard");
//       }
//     } else {
//       setMessage(data.error || "Invalid credentials ❌");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     setMessage("Something went wrong. Try again!");
//   }
// };
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important!
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("Login successful ✅");
      // Redirect based on role
      if (data.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } else {
      alert(data.error || "Login failed ❌");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: `url(${hospitalBg})` }}
    >
      <div className="bg-blue-200 p-8 rounded-l-2xl shadow-2xl w-[400px] h-full flex flex-col justify-center">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Hospital Logo" className="w-20 h-20 mb-3" />
          <h1 className="text-3xl font-bold text-blue-900">
            CityCare Hospital
          </h1>
        </div>

        {showLogin ? (
          <>
            <h2 className="text-xl font-semibold text-blue-900 text-center mb-4">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-blue-900 rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-blue-900 rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </form>

            {message && (
              <p className="text-center text-red-700 mt-3">{message}</p>
            )}

            <p
              onClick={() => setShowLogin(false)}
              className="text-sm text-blue-800 text-center mt-4 cursor-pointer hover:underline"
            >
              Don’t have an account? Sign up
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-blue-900 text-center mb-4">
              Welcome
            </h2>
            <button
              onClick={() => setShowLogin(true)}
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 mb-4"
            >
              Go to Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
