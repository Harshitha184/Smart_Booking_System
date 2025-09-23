import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import MyBookings from "./pages/MyBookings";
import AdminRooms from "./pages/AdminRooms";
import AdminBookings from "./pages/AdminBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<ProtectedRoute><Rooms/></ProtectedRoute>} />
          <Route path="/rooms" element={<ProtectedRoute><Rooms/></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings/></ProtectedRoute>} />
          <Route path="/admin/rooms" element={<AdminRoute><AdminRooms/></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookings/></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

