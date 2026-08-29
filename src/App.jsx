import { Route, Routes } from "react-router-dom";

import About from "./pages/about/About";
import Home from "./pages/home/Home";

import Navbar from "./component/Navbar";
import AdminRoute from "./admin/AdminRoute";
import Cars from "./pages/cars/Cars";
import UploadCars from "./pages/cars/UploadCars";
import CarDetails from "./pages/cars/CarDetails";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

import CarBooking from "./pages/booking/CarBooking";
import MyBookings from "./pages/booking/MyBookings";
import BookingDetails from "./pages/booking/BookingDetails";

import AdminDashboard from "./admin/AdminDashboard";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";

function App() {
  return (
    <>
    <ScrollToTop/>
      <Navbar />


      <Routes>
        {/* =========================
            AUTH ROUTES
        ========================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route path="/cars" element={<Cars />} />

        <Route path="/about" element={<About />} />

        <Route path="/cars/:id" element={<CarDetails />} />

        {/* =========================
            BOOKING ROUTES
        ========================== */}

        <Route path="/cars/:id/bookings" element={<CarBooking />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/my-bookings/:bookingId" element={<BookingDetails />} />

        <Route path="/booking-details/:id" element={<BookingDetails />} />

        {/* =========================
            CAR MANAGEMENT
        ========================== */}

        <Route path="/upload-cars" element={<UploadCars />} />

        {/* =========================
            PROTECTED ADMIN ROUTE
        ========================== */}

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
