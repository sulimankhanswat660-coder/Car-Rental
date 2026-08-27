// import { useEffect, useState } from "react";

// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   CircularProgress,
//   Alert,
//   Chip,
//   Divider,
//   Stack,
//   Paper,
// } from "@mui/material";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import PersonIcon from "@mui/icons-material/Person";
// import EventIcon from "@mui/icons-material/Event";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import BadgeIcon from "@mui/icons-material/Badge";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// import {
//   doc,
//   getDoc,
// } from "firebase/firestore";

// import {
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import { db } from "../../lib/Firebase";

// import { useUser } from "../../context/UserContext";

// function BookingDetails() {
//   const { bookingId } = useParams();

//   const navigate = useNavigate();

//   const { currentUser } = useUser();

//   const [booking, setBooking] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   // ==========================================
//   // GET BOOKING
//   // ==========================================

//   useEffect(() => {
//     const getBooking = async () => {
//       try {
//         setLoading(true);

//         setError("");

//         // -------------------------------
//         // CHECK LOGIN
//         // -------------------------------

//         if (!currentUser) {
//           setError(
//             "Please login to view this booking."
//           );

//           return;
//         }

//         // -------------------------------
//         // CHECK BOOKING ID
//         // -------------------------------

//         if (!bookingId) {
//           setError(
//             "Booking ID is missing."
//           );

//           return;
//         }

//         // -------------------------------
//         // GET BOOKING
//         // -------------------------------

//         const bookingRef = doc(
//           db,
//           "bookings",
//           bookingId
//         );

//         const bookingSnapshot =
//           await getDoc(bookingRef);

//         // -------------------------------
//         // BOOKING NOT FOUND
//         // -------------------------------

//         if (!bookingSnapshot.exists()) {
//           setError(
//             "Booking not found."
//           );

//           return;
//         }

//         const bookingData =
//           bookingSnapshot.data();

//         // -------------------------------
//         // SECURITY CHECK
//         // -------------------------------

//         if (
//           bookingData.userId !==
//           currentUser.uid
//         ) {
//           setError(
//             "You are not allowed to view this booking."
//           );

//           return;
//         }

//         // -------------------------------
//         // SET BOOKING
//         // -------------------------------

//         setBooking({
//           id: bookingSnapshot.id,
//           ...bookingData,
//         });
//       } catch (error) {
//         console.error(
//           "Error getting booking:",
//           error
//         );

//         setError(
//           "Failed to load booking details."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBooking();
//   }, [bookingId, currentUser]);

//   // ==========================================
//   // LOADING
//   // ==========================================

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "70vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // ==========================================
//   // ERROR
//   // ==========================================

//   if (error || !booking) {
//     return (
//       <Container
//         maxWidth="md"
//         sx={{
//           py: 8,
//         }}
//       >
//         <Alert severity="error">
//           {error || "Booking not found."}
//         </Alert>

//         <Button
//           startIcon={<ArrowBackIcon />}
//           onClick={() =>
//             navigate("/my-bookings")
//           }
//           sx={{
//             mt: 3,
//             textTransform: "none",
//             fontWeight: 700,
//           }}
//         >
//           Back to My Bookings
//         </Button>
//       </Container>
//     );
//   }

//   // ==========================================
//   // FORMAT STATUS
//   // ==========================================

//   const status =
//     booking.status || "confirmed";

//   // ==========================================
//   // PAGE
//   // ==========================================

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundColor: "#f8fafc",
//         py: {
//           xs: 4,
//           md: 7,
//         },
//       }}
//     >
//       <Container maxWidth="lg">

//         {/* =====================================
//             BACK BUTTON
//         ===================================== */}

//         <Button
//           startIcon={<ArrowBackIcon />}
//           onClick={() =>
//             navigate("/my-bookings")
//           }
//           sx={{
//             mb: 3,
//             color: "#111827",
//             textTransform: "none",
//             fontWeight: 700,
//           }}
//         >
//           Back to My Bookings
//         </Button>

//         {/* =====================================
//             PAGE HEADER
//         ===================================== */}

//         <Box
//           sx={{
//             mb: 4,
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 900,
//               color: "#111827",
//               mb: 1,
//               fontSize: {
//                 xs: "2rem",
//                 md: "2.5rem",
//               },
//             }}
//           >
//             Booking Details
//           </Typography>

//           <Typography
//             sx={{
//               color: "#6b7280",
//             }}
//           >
//             Complete information about your
//             car rental.
//           </Typography>
//         </Box>

//         {/* =====================================
//             CAR INFORMATION
//         ===================================== */}

//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: 3,
//             border: "1px solid #e5e7eb",
//             overflow: "hidden",
//             mb: 3,
//           }}
//         >
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: {
//                 xs: "1fr",
//                 md: "350px 1fr",
//               },
//             }}
//           >
//             {/* IMAGE */}

//             <Box
//               component="img"
//               src={booking.carImage}
//               alt={booking.carName}
//               sx={{
//                 width: "100%",
//                 height: {
//                   xs: 230,
//                   md: "100%",
//                 },
//                 minHeight: {
//                   md: 260,
//                 },
//                 objectFit: "cover",
//                 display: "block",
//               }}
//             />

//             {/* CAR INFO */}

//             <Box
//               sx={{
//                 p: {
//                   xs: 3,
//                   md: 4,
//                 },
//               }}
//             >
//               <Stack
//                 direction="row"
//                 justifyContent="space-between"
//                 alignItems="flex-start"
//                 spacing={2}
//               >
//                 <Box>
//                   <Typography
//                     sx={{
//                       color: "#6b7280",
//                       fontSize: "0.85rem",
//                       mb: 0.5,
//                     }}
//                   >
//                     RENTAL VEHICLE
//                   </Typography>

//                   <Typography
//                     variant="h5"
//                     sx={{
//                       fontWeight: 900,
//                       color: "#111827",
//                     }}
//                   >
//                     {booking.carName}
//                   </Typography>
//                 </Box>

//                 <Chip
//                   label={status}
//                   color={
//                     status === "confirmed"
//                       ? "success"
//                       : status ===
//                         "cancelled"
//                       ? "error"
//                       : "warning"
//                   }
//                   sx={{
//                     fontWeight: 700,
//                     textTransform: "capitalize",
//                   }}
//                 />
//               </Stack>

//               <Divider
//                 sx={{
//                   my: 3,
//                 }}
//               />

//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <AttachMoneyIcon
//                   sx={{
//                     color: "#111827",
//                   }}
//                 />

//                 <Typography
//                   sx={{
//                     fontWeight: 800,
//                     fontSize: "1.2rem",
//                   }}
//                 >
//                   ${booking.pricePerDay}
//                 </Typography>

//                 <Typography
//                   sx={{
//                     color: "#6b7280",
//                   }}
//                 >
//                   / day
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Paper>

//         {/* =====================================
//             MAIN GRID
//         ===================================== */}

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               md: "1fr 1fr",
//             },
//             gap: 3,
//           }}
//         >

//           {/* ===================================
//               RENTAL INFORMATION
//           =================================== */}

//           <Paper
//             elevation={0}
//             sx={{
//               p: {
//                 xs: 3,
//                 md: 4,
//               },
//               borderRadius: 3,
//               border:
//                 "1px solid #e5e7eb",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1.5,
//                 mb: 3,
//               }}
//             >
//               <EventIcon />

//               <Typography
//                 sx={{
//                   fontWeight: 800,
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 Rental Information
//               </Typography>
//             </Box>

//             <Stack spacing={2}>

//               <DetailRow
//                 label="Pickup Date"
//                 value={
//                   booking.pickupDate
//                 }
//               />

//               <DetailRow
//                 label="Return Date"
//                 value={
//                   booking.returnDate
//                 }
//               />

//               <DetailRow
//                 label="Rental Days"
//                 value={`${booking.days} days`}
//               />

//               <DetailRow
//                 label="Pickup Location"
//                 value={
//                   booking.pickupLocation
//                 }
//               />

//               <DetailRow
//                 label="Return Location"
//                 value={
//                   booking.returnLocation
//                 }
//               />

//             </Stack>
//           </Paper>

//           {/* ===================================
//               CUSTOMER INFORMATION
//           =================================== */}

//           <Paper
//             elevation={0}
//             sx={{
//               p: {
//                 xs: 3,
//                 md: 4,
//               },
//               borderRadius: 3,
//               border:
//                 "1px solid #e5e7eb",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1.5,
//                 mb: 3,
//               }}
//             >
//               <PersonIcon />

//               <Typography
//                 sx={{
//                   fontWeight: 800,
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 Customer Information
//               </Typography>
//             </Box>

//             <Stack spacing={2}>

//               <DetailRow
//                 label="Full Name"
//                 value={
//                   booking.userName ||
//                   booking.name
//                 }
//               />

//               <DetailRow
//                 label="Email"
//                 value={
//                   booking.userEmail ||
//                   booking.email
//                 }
//               />

//               <DetailRow
//                 label="Phone"
//                 value={
//                   booking.phone
//                 }
//               />

//               <DetailRow
//                 label="Date of Birth"
//                 value={
//                   booking.dateOfBirth
//                 }
//               />

//               <DetailRow
//                 label="Address"
//                 value={
//                   booking.address
//                 }
//               />

//               <DetailRow
//                 label="City"
//                 value={
//                   booking.city
//                 }
//               />

//               <DetailRow
//                 label="Country"
//                 value={
//                   booking.country
//                 }
//               />

//             </Stack>
//           </Paper>

//           {/* ===================================
//               DRIVING INFORMATION
//           =================================== */}

//           <Paper
//             elevation={0}
//             sx={{
//               p: {
//                 xs: 3,
//                 md: 4,
//               },
//               borderRadius: 3,
//               border:
//                 "1px solid #e5e7eb",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1.5,
//                 mb: 3,
//               }}
//             >
//               <BadgeIcon />

//               <Typography
//                 sx={{
//                   fontWeight: 800,
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 Driving Information
//               </Typography>
//             </Box>

//             <Stack spacing={2}>

//               <DetailRow
//                 label="License Number"
//                 value={
//                   booking.licenseNumber
//                 }
//               />

//               <DetailRow
//                 label="License Expiry"
//                 value={
//                   booking.licenseExpiry
//                 }
//               />

//             </Stack>
//           </Paper>

//           {/* ===================================
//               LOCATION INFORMATION
//           =================================== */}

//           <Paper
//             elevation={0}
//             sx={{
//               p: {
//                 xs: 3,
//                 md: 4,
//               },
//               borderRadius: 3,
//               border:
//                 "1px solid #e5e7eb",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1.5,
//                 mb: 3,
//               }}
//             >
//               <LocationOnIcon />

//               <Typography
//                 sx={{
//                   fontWeight: 800,
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 Pickup & Return
//               </Typography>
//             </Box>

//             <Stack spacing={2}>

//               <DetailRow
//                 label="Pickup Location"
//                 value={
//                   booking.pickupLocation
//                 }
//               />

//               <DetailRow
//                 label="Return Location"
//                 value={
//                   booking.returnLocation
//                 }
//               />

//             </Stack>
//           </Paper>
//         </Box>

//         {/* =====================================
//             SPECIAL REQUEST
//         ===================================== */}

//         {booking.specialRequest && (
//           <Paper
//             elevation={0}
//             sx={{
//               mt: 3,
//               p: {
//                 xs: 3,
//                 md: 4,
//               },
//               borderRadius: 3,
//               border:
//                 "1px solid #e5e7eb",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontWeight: 800,
//                 fontSize: "1.2rem",
//                 mb: 2,
//               }}
//             >
//               Special Request
//             </Typography>

//             <Typography
//               sx={{
//                 color: "#6b7280",
//                 lineHeight: 1.8,
//               }}
//             >
//               {booking.specialRequest}
//             </Typography>
//           </Paper>
//         )}

//         {/* =====================================
//             PRICE SUMMARY
//         ===================================== */}

//         <Paper
//           elevation={0}
//           sx={{
//             mt: 3,
//             p: {
//               xs: 3,
//               md: 4,
//             },
//             borderRadius: 3,
//             border:
//               "1px solid #e5e7eb",
//           }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 800,
//               fontSize: "1.2rem",
//               mb: 3,
//             }}
//           >
//             Price Summary
//           </Typography>

//           <Stack spacing={2}>

//             <DetailRow
//               label="Price Per Day"
//               value={`$${booking.pricePerDay}`}
//             />

//             <DetailRow
//               label="Rental Days"
//               value={`${booking.days} days`}
//             />

//           </Stack>

//           <Divider
//             sx={{
//               my: 3,
//             }}
//           />

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent:
//                 "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontWeight: 900,
//                 fontSize: "1.1rem",
//               }}
//             >
//               Total Price
//             </Typography>

//             <Typography
//               sx={{
//                 fontWeight: 900,
//                 fontSize: "1.7rem",
//                 color: "#111827",
//               }}
//             >
//               ${booking.totalPrice}
//             </Typography>
//           </Box>
//         </Paper>

//         {/* =====================================
//             BACK BUTTON
//         ===================================== */}

//         <Button
//           fullWidth
//           variant="contained"
//           startIcon={<ArrowBackIcon />}
//           onClick={() =>
//             navigate("/my-bookings")
//           }
//           sx={{
//             mt: 4,
//             py: 1.5,
//             borderRadius: 2,
//             backgroundColor: "#111827",
//             textTransform: "none",
//             fontWeight: 700,
//             "&:hover": {
//               backgroundColor: "#374151",
//             },
//           }}
//         >
//           Back to My Bookings
//         </Button>

//       </Container>
//     </Box>
//   );
// }

// // ==========================================
// // DETAIL ROW COMPONENT
// // ==========================================

// function DetailRow({
//   label,
//   value,
// }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         gap: 2,
//       }}
//     >
//       <Typography
//         sx={{
//           color: "#6b7280",
//           fontSize: "0.9rem",
//           flexShrink: 0,
//         }}
//       >
//         {label}
//       </Typography>

//       <Typography
//         sx={{
//           fontWeight: 700,
//           color: "#111827",
//           textAlign: "right",
//           wordBreak: "break-word",
//         }}
//       >
//         {value || "Not provided"}
//       </Typography>
//     </Box>
//   );
// }

// export default BookingDetails;







import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { db } from "../../lib/Firebase";

import { useUser } from "../../context/UserContext";

function BookingDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useUser();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  const [cancelling, setCancelling] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  // ==========================================
  // GET BOOKING
  // ==========================================

  useEffect(() => {
    const getBooking = async () => {
      try {
        setLoading(true);
        setError("");

        if (!currentUser) {
          navigate("/login");
          return;
        }

        const bookingRef = doc(
          db,
          "bookings",
          id
        );

        const bookingSnapshot =
          await getDoc(bookingRef);

        if (!bookingSnapshot.exists()) {
          setError("Booking not found.");
          return;
        }

        const bookingData =
          bookingSnapshot.data();

        // =====================================
        // SECURITY CHECK
        // =====================================

        if (
          bookingData.userId !==
          currentUser.uid
        ) {
          setError(
            "You are not allowed to view this booking."
          );

          return;
        }

        setBooking({
          id: bookingSnapshot.id,
          ...bookingData,
        });
      } catch (error) {
        console.error(
          "Error getting booking:",
          error
        );

        setError(
          "Failed to load booking details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id && currentUser) {
      getBooking();
    }
  }, [id, currentUser, navigate]);

  // ==========================================
  // OPEN CANCEL DIALOG
  // ==========================================

  const handleCancelClick = () => {
    setOpenDialog(true);
  };

  // ==========================================
  // CLOSE CANCEL DIALOG
  // ==========================================

  const handleCloseDialog = () => {
    if (!cancelling) {
      setOpenDialog(false);
    }
  };

  // ==========================================
  // CANCEL BOOKING
  // ==========================================

  const cancelBooking = async () => {
    if (!booking) {
      return;
    }

    setCancelling(true);
    setError("");
    setSuccess("");

    try {
      const bookingRef = doc(
        db,
        "bookings",
        booking.id
      );

      await updateDoc(
        bookingRef,
        {
          status: "cancelled",
        }
      );

      // Update local state immediately

      setBooking((previous) => ({
        ...previous,

        status: "cancelled",
      }));

      setSuccess(
        "Your booking has been cancelled successfully."
      );

      setOpenDialog(false);
    } catch (error) {
      console.error(
        "Cancel booking error:",
        error
      );

      setError(
        "Something went wrong while cancelling your booking."
      );
    } finally {
      setCancelling(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !booking) {
    return (
      <Container
        maxWidth="md"
        sx={{
          py: 6,
        }}
      >
        <Alert severity="error">
          {error || "Booking not found."}
        </Alert>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            navigate("/my-bookings")
          }
          sx={{
            mt: 3,
            textTransform: "none",
          }}
        >
          Back to My Bookings
        </Button>
      </Container>
    );
  }

  // ==========================================
  // STATUS
  // ==========================================

  const isCancelled =
    booking.status === "cancelled";

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor: "#f8fafc",

        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Container maxWidth="md">

        {/* =====================================
            BACK BUTTON
        ===================================== */}

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            navigate("/my-bookings")
          }
          sx={{
            mb: 3,

            color: "#111827",

            textTransform: "none",

            fontWeight: 600,
          }}
        >
          Back to My Bookings
        </Button>

        {/* =====================================
            SUCCESS
        ===================================== */}

        {success && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
            }}
          >
            {success}
          </Alert>
        )}

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
            }}
          >
            {error}
          </Alert>
        )}

        {/* =====================================
            MAIN CARD
        ===================================== */}

        <Box
          sx={{
            backgroundColor: "#ffffff",

            borderRadius: 3,

            overflow: "hidden",

            border:
              "1px solid #e5e7eb",

            boxShadow:
              "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >

          {/* ===================================
              HEADER
          =================================== */}

          <Box
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },

              display: "flex",

              justifyContent:
                "space-between",

              alignItems: {
                xs: "flex-start",
                sm: "center",
              },

              gap: 2,

              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,

                  color: "#111827",
                }}
              >
                Booking Details
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",

                  mt: 0.5,

                  fontSize: "0.9rem",
                }}
              >
                Booking ID: {booking.id}
              </Typography>
            </Box>

            <Chip
              label={
                isCancelled
                  ? "Cancelled"
                  : "Confirmed"
              }
              color={
                isCancelled
                  ? "error"
                  : "success"
              }
              sx={{
                fontWeight: 700,
              }}
            />
          </Box>

          <Divider />

          {/* ===================================
              CAR
          =================================== */}

          <Box
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: "1.1rem",

                mb: 2,
              }}
            >
              Car Information
            </Typography>

            <Box
              sx={{
                display: "flex",

                gap: 2,

                alignItems: "center",

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },

                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
              }}
            >
              <Box
                component="img"
                src={booking.carImage}
                alt={booking.carName}
                sx={{
                  width: {
                    xs: "100%",
                    sm: 180,
                  },

                  height: {
                    xs: 180,
                    sm: 120,
                  },

                  objectFit: "cover",

                  borderRadius: 2,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,

                    fontSize: "1.2rem",

                    color: "#111827",
                  }}
                >
                  {booking.carName}
                </Typography>

                <Typography
                  sx={{
                    color: "#6b7280",

                    mt: 0.5,
                  }}
                >
                  ${booking.pricePerDay} / day
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* ===================================
              RENTAL INFORMATION
          =================================== */}

          <Box
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: "1.1rem",

                mb: 2,
              }}
            >
              Rental Information
            </Typography>

            <Stack spacing={2}>

              <InfoRow
                icon={<EventIcon />}
                label="Pickup Date"
                value={
                  booking.pickupDate
                }
              />

              <InfoRow
                icon={<EventIcon />}
                label="Return Date"
                value={
                  booking.returnDate
                }
              />

              <InfoRow
                icon={
                  <DirectionsCarIcon />
                }
                label="Rental Days"
                value={`${booking.days} days`}
              />

              <InfoRow
                icon={
                  <LocationOnIcon />
                }
                label="Pickup Location"
                value={
                  booking.pickupLocation
                }
              />

              <InfoRow
                icon={
                  <LocationOnIcon />
                }
                label="Return Location"
                value={
                  booking.returnLocation
                }
              />

            </Stack>
          </Box>

          <Divider />

          {/* ===================================
              CUSTOMER INFORMATION
          =================================== */}

          <Box
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: "1.1rem",

                mb: 2,
              }}
            >
              Customer Information
            </Typography>

            <Stack spacing={2}>

              <InfoRow
                icon={<PersonIcon />}
                label="Name"
                value={booking.userName}
              />

              <InfoRow
                icon={<PersonIcon />}
                label="Email"
                value={
                  booking.userEmail
                }
              />

              <InfoRow
                icon={<PersonIcon />}
                label="Phone"
                value={
                  booking.phone
                }
              />

              <InfoRow
                icon={<PersonIcon />}
                label="Address"
                value={
                  booking.address
                }
              />

              <InfoRow
                icon={<PersonIcon />}
                label="City"
                value={
                  booking.city
                }
              />

              <InfoRow
                icon={<PersonIcon />}
                label="Country"
                value={
                  booking.country
                }
              />

            </Stack>
          </Box>

          <Divider />

          {/* ===================================
              DRIVING INFORMATION
          =================================== */}

          <Box
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: "1.1rem",

                mb: 2,
              }}
            >
              Driving Information
            </Typography>

            <Stack spacing={2}>

              <InfoRow
                label="License Number"
                value={
                  booking.licenseNumber
                }
              />

              <InfoRow
                label="License Expiry"
                value={
                  booking.licenseExpiry
                }
              />

            </Stack>
          </Box>

          {/* ===================================
              SPECIAL REQUEST
          =================================== */}

          {booking.specialRequest && (
            <>
              <Divider />

              <Box
                sx={{
                  p: {
                    xs: 2.5,
                    sm: 4,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,

                    mb: 1,
                  }}
                >
                  Special Request
                </Typography>

                <Typography
                  sx={{
                    color: "#6b7280",

                    lineHeight: 1.7,
                  }}
                >
                  {booking.specialRequest}
                </Typography>
              </Box>
            </>
          )}

          <Divider />

          {/* ===================================
              TOTAL
          =================================== */}

          <Box
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
              },

              backgroundColor:
                "#f9fafb",
            }}
          >
            <Box
              sx={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                gap: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,

                  fontSize: "1.1rem",
                }}
              >
                Total Price
              </Typography>

              <Typography
                sx={{
                  fontWeight: 900,

                  fontSize: {
                    xs: "1.3rem",
                    sm: "1.6rem",
                  },

                  color: "#111827",
                }}
              >
                ${booking.totalPrice}
              </Typography>
            </Box>
          </Box>

          {/* ===================================
              CANCEL BUTTON
          =================================== */}

          {!isCancelled && (
            <>
              <Divider />

              <Box
                sx={{
                  p: {
                    xs: 2.5,
                    sm: 4,
                  },
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={
                    <CancelIcon />
                  }
                  onClick={
                    handleCancelClick
                  }
                  disabled={cancelling}
                  sx={{
                    py: 1.4,

                    borderRadius: 2,

                    textTransform:
                      "none",

                    fontWeight: 700,
                  }}
                >
                  Cancel Booking
                </Button>
              </Box>
            </>
          )}

          {/* ===================================
              CANCELLED MESSAGE
          =================================== */}

          {isCancelled && (
            <>
              <Divider />

              <Box
                sx={{
                  p: 3,

                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#dc2626",

                    fontWeight: 700,
                  }}
                >
                  This booking has been
                  cancelled.
                </Typography>
              </Box>
            </>
          )}

        </Box>
      </Container>

      {/* ======================================
          CONFIRMATION DIALOG
      ====================================== */}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
          }}
        >
          Cancel Booking?
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              color: "#6b7280",
            }}
          >
            Are you sure you want to cancel
            this booking for{" "}
            <strong>
              {booking.carName}
            </strong>
            ?
          </Typography>

          <Typography
            sx={{
              mt: 2,

              color: "#dc2626",

              fontSize: "0.9rem",
            }}
          >
            This action will mark your booking
            as cancelled.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,

            gap: 1,
          }}
        >
          <Button
            onClick={
              handleCloseDialog
            }
            disabled={cancelling}
            sx={{
              textTransform: "none",

              fontWeight: 700,
            }}
          >
            No, Keep Booking
          </Button>

          <Button
            onClick={cancelBooking}
            variant="contained"
            color="error"
            disabled={cancelling}
            sx={{
              textTransform: "none",

              fontWeight: 700,
            }}
          >
            {cancelling ? (
              <>
                <CircularProgress
                  size={20}
                  color="inherit"
                  sx={{
                    mr: 1,
                  }}
                />

                Cancelling...
              </>
            ) : (
              "Yes, Cancel"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ==========================================
// INFO ROW COMPONENT
// ==========================================

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <Box
      sx={{
        display: "flex",

        gap: 1.5,

        alignItems: "center",

        justifyContent:
          "space-between",

        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          gap: 1,

          color: "#6b7280",
        }}
      >
        {icon}

        <Typography
          sx={{
            fontSize: "0.9rem",
          }}
        >
          {label}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontWeight: 700,

          color: "#111827",

          textAlign: {
            xs: "left",
            sm: "right",
          },

          wordBreak: "break-word",
        }}
      >
        {value || "N/A"}
      </Typography>
    </Box>
  );
}

export default BookingDetails;