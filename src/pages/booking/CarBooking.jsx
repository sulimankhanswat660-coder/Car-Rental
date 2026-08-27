import { useState } from "react";

import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";

import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import BookingForm from "./BookingForm";
import CustomerForm from "./CustomerForm";
import BookingSummary from "./BookingSummary";

import { db } from "../../lib/Firebase";

function CarBooking({ car }) {
  const navigate = useNavigate();

  const { currentUser, userData } = useUser();

  // ==========================================
  // STATES
  // ==========================================

  const [loading, setLoading] = useState(false);

  const [confirming, setConfirming] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [isAvailable, setIsAvailable] = useState(false);

  const [showCustomerForm, setShowCustomerForm] =
    useState(false);

  const [showSummary, setShowSummary] = useState(false);

  const [bookingDetails, setBookingDetails] =
    useState(null);

  // ==========================================
  // REACT HOOK FORM
  // ==========================================

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      city: "",
      country: "Pakistan",
      licenseNumber: "",
      licenseExpiry: "",
      pickupDate: "",
      returnDate: "",
      pickupLocation: "",
      returnLocation: "",
      specialRequest: "",
    },
  });

  // ==========================================
  // LOAD USER DATA
  // ==========================================

  const loadUserData = () => {
    const name =
      userData?.name ||
      currentUser?.displayName ||
      "";

    const email =
      userData?.email ||
      currentUser?.email ||
      "";

    // IMPORTANT:
    // setValue updates React Hook Form values
    // and therefore TextField values.

    setValue("name", name, {
      shouldValidate: true,
    });

    setValue("email", email, {
      shouldValidate: true,
    });
  };

  // ==========================================
  // CHECK CAR
  // ==========================================

  if (!car) {
    return (
      <Box
        sx={{
          mt: 4,
          textAlign: "center",
        }}
      >
        <CircularProgress />

        <Typography sx={{ mt: 2 }}>
          Loading car information...
        </Typography>
      </Box>
    );
  }

  // ==========================================
  // STEP 1
  // CHECK AVAILABILITY
  // ==========================================

  const checkAvailability = async (data) => {
    setError("");
    setSuccess("");
    setIsAvailable(false);

    // ----------------------------------------
    // LOGIN CHECK
    // ----------------------------------------

    if (!currentUser) {
      navigate("/signup");
      return;
    }

    setLoading(true);

    try {
      const bookingsRef = collection(
        db,
        "bookings"
      );

      const bookingQuery = query(
        bookingsRef,
        where("carId", "==", car.id)
      );

      const snapshot = await getDocs(
        bookingQuery
      );

      const selectedPickup = new Date(
        `${data.pickupDate}T00:00:00`
      );

      const selectedReturn = new Date(
        `${data.returnDate}T00:00:00`
      );

      let alreadyBooked = false;

      let bookedUntil = null;

      // ----------------------------------------
      // CHECK ALL BOOKINGS
      // ----------------------------------------

      snapshot.forEach((document) => {
        const booking = document.data();

        // Ignore cancelled bookings
        if (booking.status === "cancelled") {
          return;
        }

        if (
          !booking.pickupDate ||
          !booking.returnDate
        ) {
          return;
        }

        const existingPickup = new Date(
          `${booking.pickupDate}T00:00:00`
        );

        const existingReturn = new Date(
          `${booking.returnDate}T00:00:00`
        );

        // --------------------------------------
        // OVERLAP CHECK
        // --------------------------------------

        if (
          selectedPickup <= existingReturn &&
          selectedReturn >= existingPickup
        ) {
          alreadyBooked = true;

          if (
            !bookedUntil ||
            existingReturn > bookedUntil
          ) {
            bookedUntil = existingReturn;
          }
        }
      });

      // ----------------------------------------
      // CAR ALREADY RENTED
      // ----------------------------------------

      if (alreadyBooked) {
        const date =
          bookedUntil.toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );

        setError(
          `This car is already rented until ${date}. Please select different dates.`
        );

        return;
      }

      // ----------------------------------------
      // CAR AVAILABLE
      // ----------------------------------------

      setBookingDetails({
        carId: car.id,

        carName: car.name,

        carImage: car.image,

        pricePerDay: Number(car.price),

        pickupDate: data.pickupDate,

        returnDate: data.returnDate,

        userId: currentUser.uid,
      });

      setIsAvailable(true);
    } catch (error) {
      console.error(
        "Availability error:",
        error
      );

      setError(
        "Something went wrong while checking availability."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // STEP 2
  // CUSTOMER FORM
  // ==========================================

  const createBookingDetails = (data) => {
    setError("");
    setSuccess("");

    try {
      const selectedPickup = new Date(
        `${data.pickupDate}T00:00:00`
      );

      const selectedReturn = new Date(
        `${data.returnDate}T00:00:00`
      );

      const difference =
        selectedReturn - selectedPickup;

      const days = Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      );

      const totalPrice =
        days * Number(car.price);

      setBookingDetails((previous) => ({
        ...previous,

        days,

        totalPrice,

        name: data.name.trim(),

        email: data.email.trim(),

        phone: data.phone.trim(),

        dateOfBirth: data.dateOfBirth,

        address: data.address.trim(),

        city: data.city.trim(),

        country: data.country.trim(),

        licenseNumber:
          data.licenseNumber.trim(),

        licenseExpiry:
          data.licenseExpiry,

        pickupLocation:
          data.pickupLocation.trim(),

        returnLocation:
          data.returnLocation.trim(),

        specialRequest:
          data.specialRequest.trim(),
      }));

      setShowCustomerForm(false);

      setShowSummary(true);
    } catch (error) {
      console.error(
        "Booking details error:",
        error
      );

      setError(
        "Unable to prepare your booking."
      );
    }
  };

  // ==========================================
  // STEP 3
  // FINAL AVAILABILITY CHECK
  // ==========================================

  const checkFinalAvailability = async () => {
    const bookingsRef = collection(
      db,
      "bookings"
    );

    const bookingQuery = query(
      bookingsRef,
      where(
        "carId",
        "==",
        bookingDetails.carId
      )
    );

    const snapshot = await getDocs(
      bookingQuery
    );

    const selectedPickup = new Date(
      `${bookingDetails.pickupDate}T00:00:00`
    );

    const selectedReturn = new Date(
      `${bookingDetails.returnDate}T00:00:00`
    );

    let alreadyBooked = false;

    let bookedUntil = null;

    snapshot.forEach((document) => {
      const booking = document.data();

      if (booking.status === "cancelled") {
        return;
      }

      if (
        !booking.pickupDate ||
        !booking.returnDate
      ) {
        return;
      }

      const existingPickup = new Date(
        `${booking.pickupDate}T00:00:00`
      );

      const existingReturn = new Date(
        `${booking.returnDate}T00:00:00`
      );

      if (
        selectedPickup <= existingReturn &&
        selectedReturn >= existingPickup
      ) {
        alreadyBooked = true;

        if (
          !bookedUntil ||
          existingReturn > bookedUntil
        ) {
          bookedUntil = existingReturn;
        }
      }
    });

    return {
      alreadyBooked,
      bookedUntil,
    };
  };

  // ==========================================
  // STEP 4
  // CONFIRM BOOKING
  // ==========================================

  const confirmBooking = async () => {
    setError("");
    setSuccess("");

    if (!currentUser) {
      navigate("/signin");
      return;
    }

    if (!bookingDetails) {
      setError(
        "Booking information is missing."
      );

      return;
    }

    setConfirming(true);

    try {
      // --------------------------------------
      // FINAL AVAILABILITY CHECK
      // --------------------------------------

      const {
        alreadyBooked,
        bookedUntil,
      } =
        await checkFinalAvailability();

      // --------------------------------------
      // CAR BECAME UNAVAILABLE
      // --------------------------------------

      if (alreadyBooked) {
        const date =
          bookedUntil.toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );

        setError(
          `Sorry, this car was just booked until ${date}. Please select different dates.`
        );

        setShowSummary(false);

        setShowCustomerForm(false);

        setIsAvailable(false);

        setBookingDetails(null);

        return;
      }

      // --------------------------------------
      // SAVE BOOKING
      // --------------------------------------

      const bookingsRef = collection(
        db,
        "bookings"
      );

      await addDoc(bookingsRef, {
        carId: bookingDetails.carId,

        carName: bookingDetails.carName,

        carImage: bookingDetails.carImage,

        pricePerDay:
          bookingDetails.pricePerDay,

        pickupDate:
          bookingDetails.pickupDate,

        returnDate:
          bookingDetails.returnDate,

        days: bookingDetails.days,

        totalDays: bookingDetails.days,

        totalPrice:
          bookingDetails.totalPrice,

        userId:
          bookingDetails.userId,

        userName:
          bookingDetails.name,

        userEmail:
          bookingDetails.email,

        phone:
          bookingDetails.phone,

        dateOfBirth:
          bookingDetails.dateOfBirth,

        address:
          bookingDetails.address,

        city:
          bookingDetails.city,

        country:
          bookingDetails.country,

        licenseNumber:
          bookingDetails.licenseNumber,

        licenseExpiry:
          bookingDetails.licenseExpiry,

        pickupLocation:
          bookingDetails.pickupLocation,

        returnLocation:
          bookingDetails.returnLocation,

        specialRequest:
          bookingDetails.specialRequest,

        status: "confirmed",

        createdAt:
          serverTimestamp(),
      });

      // --------------------------------------
      // SUCCESS
      // --------------------------------------

      setSuccess(
        "Your car has been booked successfully!"
      );

      setShowSummary(false);

      setShowCustomerForm(false);

      setIsAvailable(false);

      setBookingDetails(null);

      // --------------------------------------
      // RESET FORM
      // --------------------------------------

      reset({
        name:
          userData?.name ||
          currentUser?.displayName ||
          "",

        email:
          userData?.email ||
          currentUser?.email ||
          "",

        phone: "",

        dateOfBirth: "",

        address: "",

        city: "",

        country: "Pakistan",

        licenseNumber: "",

        licenseExpiry: "",

        pickupDate: "",

        returnDate: "",

        pickupLocation: "",

        returnLocation: "",

        specialRequest: "",
      });
    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      setError(
        "Something went wrong while confirming your booking."
      );
    } finally {
      setConfirming(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <Box
      sx={{
        mt: 4,

        p: {
          xs: 2,
          sm: 3,
        },

        borderRadius: 3,

        backgroundColor: "#fff",

        border:
          "1px solid #e5e7eb",
      }}
    >
      {/* =====================================
          TITLE
      ===================================== */}

      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          mb: 1,
        }}
      >
        Book This Car
      </Typography>

      <Typography
        sx={{
          color: "#6b7280",
          mb: 3,
        }}
      >
        <Box
          component="span"
          sx={{
            color: "#111827",
            fontWeight: 800,
            fontSize: "1.25rem",
          }}
        >
          ${car.price}
        </Box>{" "}
        / day
      </Typography>

      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* =====================================
          SUCCESS
      ===================================== */}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
        >
          {success}
        </Alert>
      )}

      {/* =====================================
          STEP 1
          RENTAL DATES
      ===================================== */}

      {!isAvailable &&
        !showCustomerForm &&
        !showSummary && (
          <BookingForm
            register={register}
            errors={errors}
            watch={watch}
            handleSubmit={handleSubmit}
            onSubmit={checkAvailability}
            loading={loading}
          />
        )}

      {/* =====================================
          STEP 2
          CAR AVAILABLE
      ===================================== */}

      {isAvailable &&
        !showCustomerForm &&
        !showSummary && (
          <Box>
            <Alert
              severity="success"
              sx={{ mb: 3 }}
            >
              Great! This car is available
              for your selected dates.
            </Alert>

            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => {
                // IMPORTANT:
                // Load name/email before
                // opening customer form.
                loadUserData();

                setShowCustomerForm(true);
              }}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Book Now
            </Button>
          </Box>
        )}

      {/* =====================================
          STEP 3
          CUSTOMER INFORMATION
      ===================================== */}

      {showCustomerForm &&
        !showSummary && (
          <CustomerForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={createBookingDetails}
            loading={loading}
          />
        )}

      {/* =====================================
          STEP 4
          SUMMARY
      ===================================== */}

      {showSummary &&
        bookingDetails && (
          <BookingSummary
            bookingDetails={bookingDetails}
            confirming={confirming}
            onConfirm={confirmBooking}
            onChange={() => {
              setShowSummary(false);

              setShowCustomerForm(true);

              // Keep name/email filled
              loadUserData();
            }}
          />
        )}
    </Box>
  );
}

export default CarBooking;