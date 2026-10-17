
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
  doc,
  writeBatch,
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

  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
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

  const loadUserData = () => {
    setValue(
      "name",
      userData?.name || currentUser?.displayName || "",
      { shouldValidate: true }
    );

    setValue(
      "email",
      userData?.email || currentUser?.email || "",
      { shouldValidate: true }
    );
  };

  // ------------------------------------------
  // CHECK CAR DATA
  // ------------------------------------------

  if (!car) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>
          Loading car information...
        </Typography>
      </Box>
    );
  }

  // ------------------------------------------
  // GET AVAILABILITY RECORDS FOR THIS CAR
  // ------------------------------------------

  const getCarAvailability = async (carId) => {
    const availabilityRef = collection(db, "bookingAvailability");

    const availabilityQuery = query(
      availabilityRef,
      where("carId", "==", String(carId))
    );

    return await getDocs(availabilityQuery);
  };

  // ------------------------------------------
  // CHECK DATE OVERLAP
  // ------------------------------------------

  const findDateConflict = (snapshot, pickupDate, returnDate) => {
    const selectedPickup = new Date(
      `${pickupDate}T00:00:00`
    );

    const selectedReturn = new Date(
      `${returnDate}T00:00:00`
    );

    let bookedUntil = null;

    snapshot.forEach((document) => {
      const booking = document.data();

      if (
        booking.status === "cancelled" ||
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
        if (
          !bookedUntil ||
          existingReturn > bookedUntil
        ) {
          bookedUntil = existingReturn;
        }
      }
    });

    return {
      alreadyBooked: bookedUntil !== null,
      bookedUntil,
    };
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ------------------------------------------
  // STEP 1: CHECK AVAILABILITY
  // ------------------------------------------

  const checkAvailability = async (data) => {
    setError("");
    setSuccess("");
    setIsAvailable(false);
    setBookingDetails(null);

    if (!currentUser) {
      navigate("/signin");
      return;
    }

    if (
      !data.pickupDate ||
      !data.returnDate ||
      data.returnDate < data.pickupDate
    ) {
      setError("Please select valid pickup and return dates.");
      return;
    }

    setLoading(true);

    try {
      const snapshot = await getCarAvailability(car.id);

      const { alreadyBooked, bookedUntil } = findDateConflict(
        snapshot,
        data.pickupDate,
        data.returnDate
      );

      if (alreadyBooked) {
        setError(
          `This car is already booked until ${formatDate(
            bookedUntil
          )}. Please select different dates.`
        );
        return;
      }

      setBookingDetails({
        carId: String(car.id),
        carName: car.name,
        carImage: car.image,
        pricePerDay: Number(car.price),
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
        userId: currentUser.uid,
      });

      setIsAvailable(true);
    } catch (err) {
      console.error("Availability error:", err);
      setError(
        "Unable to check availability. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // STEP 2: PREPARE CUSTOMER BOOKING DETAILS
  // ------------------------------------------

  const createBookingDetails = (data) => {
    setError("");
    setSuccess("");

    try {
      const pickup = new Date(
        `${bookingDetails.pickupDate}T00:00:00`
      );

      const returning = new Date(
        `${bookingDetails.returnDate}T00:00:00`
      );

      const days = Math.ceil(
        (returning - pickup) / (1000 * 60 * 60 * 24)
      );

      if (days < 1) {
        setError(
          "The return date must be after the pickup date."
        );
        return;
      }

      const totalPrice = days * Number(car.price);

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
        licenseNumber: data.licenseNumber.trim(),
        licenseExpiry: data.licenseExpiry,
        pickupLocation: data.pickupLocation.trim(),
        returnLocation: data.returnLocation.trim(),
        specialRequest: data.specialRequest.trim(),
      }));

      setShowCustomerForm(false);
      setShowSummary(true);
    } catch (err) {
      console.error("Booking details error:", err);
      setError("Unable to prepare your booking.");
    }
  };

  // ------------------------------------------
  // STEP 3: CHECK AVAILABILITY AGAIN
  // ------------------------------------------

  const checkFinalAvailability = async () => {
    const snapshot = await getCarAvailability(
      bookingDetails.carId
    );

    return findDateConflict(
      snapshot,
      bookingDetails.pickupDate,
      bookingDetails.returnDate
    );
  };

  // ------------------------------------------
  // STEP 4: CONFIRM AND SAVE BOOKING
  // ------------------------------------------

  const confirmBooking = async () => {
    setError("");
    setSuccess("");

    if (!currentUser) {
      navigate("/signin");
      return;
    }

    if (
      !bookingDetails ||
      bookingDetails.userId !== currentUser.uid
    ) {
      setError("Booking information is missing. Please try again.");
      return;
    }

    setConfirming(true);

    try {
      const { alreadyBooked, bookedUntil } =
        await checkFinalAvailability();

      if (alreadyBooked) {
        setError(
          `Sorry, this car was just booked until ${formatDate(
            bookedUntil
          )}. Please select different dates.`
        );

        setShowSummary(false);
        setShowCustomerForm(false);
        setIsAvailable(false);
        setBookingDetails(null);
        return;
      }

      // Generate one shared ID for both documents.
      const bookingRef = doc(collection(db, "bookings"));

      const availabilityRef = doc(
        db,
        "bookingAvailability",
        bookingRef.id
      );

      const batch = writeBatch(db);

      // Private customer booking.
      batch.set(bookingRef, {
        carId: bookingDetails.carId,
        carName: bookingDetails.carName,
        carImage: bookingDetails.carImage,
        pricePerDay: bookingDetails.pricePerDay,

        pickupDate: bookingDetails.pickupDate,
        returnDate: bookingDetails.returnDate,

        days: bookingDetails.days,
        totalDays: bookingDetails.days,
        totalPrice: bookingDetails.totalPrice,

        userId: currentUser.uid,
        userName: bookingDetails.name,
        userEmail: bookingDetails.email,
        phone: bookingDetails.phone,

        dateOfBirth: bookingDetails.dateOfBirth,
        address: bookingDetails.address,
        city: bookingDetails.city,
        country: bookingDetails.country,

        licenseNumber: bookingDetails.licenseNumber,
        licenseExpiry: bookingDetails.licenseExpiry,

        pickupLocation: bookingDetails.pickupLocation,
        returnLocation: bookingDetails.returnLocation,
        specialRequest: bookingDetails.specialRequest,

        status: "confirmed",
        createdAt: serverTimestamp(),
      });

      // Only the minimum information needed for availability.
      batch.set(availabilityRef, {
        bookingId: bookingRef.id,
        carId: bookingDetails.carId,
        userId: currentUser.uid,
        pickupDate: bookingDetails.pickupDate,
        returnDate: bookingDetails.returnDate,
        status: "confirmed",
      });

      await batch.commit();

      setSuccess("Your car has been booked successfully!");

      setShowSummary(false);
      setShowCustomerForm(false);
      setIsAvailable(false);
      setBookingDetails(null);

      reset({
        name: userData?.name || currentUser.displayName || "",
        email: userData?.email || currentUser.email || "",
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
    } catch (err) {
      console.error("Booking error:", err);
      setError(
        "Unable to confirm your booking. Please try again."
      );
    } finally {
      setConfirming(false);
    }
  };

  // ------------------------------------------
  // UI
  // ------------------------------------------

  return (
    <Box
      sx={{
        mt: 4,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 1 }}
      >
        Book This Car
      </Typography>

      <Typography sx={{ color: "#6b7280", mb: 3 }}>
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {!isAvailable &&
        !showCustomerForm &&
        !showSummary && (
          <BookingForm
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            handleSubmit={handleSubmit}
            onSubmit={checkAvailability}
            loading={loading}
          />
        )}

      {isAvailable &&
        !showCustomerForm &&
        !showSummary && (
          <Box>
            <Alert severity="success" sx={{ mb: 3 }}>
              Great! This car is available for your selected dates.
            </Alert>

            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => {
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

      {showCustomerForm && !showSummary && (
        <CustomerForm
          register={register}
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={createBookingDetails}
          loading={confirming}
        />
      )}

      {showSummary && bookingDetails && (
        <BookingSummary
          bookingDetails={bookingDetails}
          confirming={confirming}
          onConfirm={confirmBooking}
          onChange={() => {
            setShowSummary(false);
            setShowCustomerForm(true);
            loadUserData();
          }}
        />
      )}
    </Box>
  );
}

export default CarBooking;
