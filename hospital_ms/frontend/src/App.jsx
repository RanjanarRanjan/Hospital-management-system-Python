import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Admindashboard from "./pages/Admindashboard";

import AddDoctor from "./pages/AddDoctor";
import ViewDoctors from "./pages/ViewDoctors";
import ViewAppointments from "./pages/ViewAppointments";
import UserDashboard from "./user/UserDashboard";
import BookAppointment from "./user/BookAppointment";
import UserAppointments from "./user/UserAppointments";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<Admindashboard/>}/>
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/admin/view-doctors" element={<ViewDoctors />} />
        {/* <Route path="/edit-doctor/:id" element={<AddDoctor />} /> */}
         <Route path="/admin/update-doctor/:id" element={<AddDoctor />} />
        <Route path="/admin/view-appointments" element={<ViewAppointments/>}/>

        <Route path="/user/book-appointment" element={<BookAppointment/>}/>
        <Route path="/user/view-appointments" element={<UserAppointments/>}/>
      </Routes>
    </Router>
  );
}

export default App;
