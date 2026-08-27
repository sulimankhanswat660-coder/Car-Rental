import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../../lib/Firebase";

import { useUser } from "../../context/UserContext";

import { useNavigate } from "react-router-dom";

function MyBookings() {
  const { currentUser } = useUser();

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // GET USER BOOKINGS
  // ==========================================

  useEffect(() => {
    const getBookings = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        setError("");

        // ======================================
        // BOOKINGS COLLECTION
        // ======================================

        const bookingsRef = collection(db, "bookings");

        // ======================================
        // GET ONLY CURRENT USER BOOKINGS
        // ======================================

        const bookingQuery = query(
          bookingsRef,
          where("userId", "==", currentUser.uid),
        );

        const snapshot = await getDocs(bookingQuery);

        // ======================================
        // CONVERT FIRESTORE DATA
        // ======================================

        const bookingData = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        // ======================================
        // SORT NEWEST BOOKINGS FIRST
        // ======================================
        // We do this in JavaScript instead
        // of Firestore orderBy.
        //
        // Therefore, no composite index
        // is required.

        bookingData.sort((a, b) => {
          const dateA = a.createdAt?.toDate
            ? a.createdAt.toDate()
            : new Date(0);

          const dateB = b.createdAt?.toDate
            ? b.createdAt.toDate()
            : new Date(0);

          return dateB - dateA;
        });

        setBookings(bookingData);
      } catch (error) {
        console.error("Error getting bookings:", error);

        setError("Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, [currentUser]);

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!currentUser) {
    return (
      <Container
        maxWidth="md"
        sx={{
          py: 8,
        }}
      >
        <Alert severity="info">Please login to view your bookings.</Alert>

        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            mt: 3,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Login
        </Button>
      </Container>
    );
  }

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

  if (error) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // ==========================================
  // NO BOOKINGS
  // ==========================================

  if (bookings.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
          py: {
            xs: 6,
            md: 10,
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#111827",
              mb: 2,
            }}
          >
            My Bookings
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              mb: 4,
            }}
          >
            You don't have any car bookings yet.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/cars")}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: "#111827",

              "&:hover": {
                backgroundColor: "#374151",
              },
            }}
          >
            Browse Cars
          </Button>
        </Container>
      </Box>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",

        py: {
          xs: 4,
          md: 7,
        },
      }}
    >
      <Container maxWidth="lg">
        {/* ====================================
            PAGE HEADER
        ==================================== */}

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#111827",
            mb: 1,
          }}
        >
          My Bookings
        </Typography>

        <Typography
          sx={{
            color: "#6b7280",
            mb: 4,
          }}
        >
          View all your car rental bookings.
        </Typography>

        {/* ====================================
            BOOKINGS
        ==================================== */}

        <Stack spacing={3}>
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              sx={{
                borderRadius: 3,
                overflow: "hidden",

                boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Box
                sx={{
                  display: "grid",

                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "280px 1fr",
                  },
                }}
              >
                {/* ============================
                    CAR IMAGE
                ============================ */}

                <CardMedia
                  component="img"
                  image={booking.carImage}
                  alt={booking.carName}
                  sx={{
                    width: "100%",

                    height: {
                      xs: 220,
                      md: "100%",
                    },

                    minHeight: 220,

                    objectFit: "cover",
                  }}
                />

                {/* ============================
                    BOOKING CONTENT
                ============================ */}

                <CardContent
                  sx={{
                    p: {
                      xs: 2.5,
                      md: 3,
                    },
                  }}
                >
                  {/* ==========================
                      CAR NAME + STATUS
                  ========================== */}

                  <Box
                    sx={{
                      display: "flex",

                      justifyContent: "space-between",

                      alignItems: "flex-start",

                      gap: 2,

                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#111827",

                          wordBreak: "break-word",
                        }}
                      >
                        {booking.carName}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#6b7280",

                          fontSize: "0.85rem",

                          mt: 0.5,

                          wordBreak: "break-all",
                        }}
                      >
                        Booking ID: {booking.id}
                      </Typography>
                    </Box>

                    <Chip
                      label={booking.status || "confirmed"}
                      color={
                        booking.status === "cancelled" ? "error" : "success"
                      }
                      size="small"
                      sx={{
                        fontWeight: 700,

                        textTransform: "capitalize",

                        flexShrink: 0,
                      }}
                    />
                  </Box>

                  <Divider
                    sx={{
                      mb: 3,
                    }}
                  />

                  {/* ==========================
                      RENTAL DATES
                  ========================== */}

                  <Typography
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                    }}
                  >
                    Rental Details
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",

                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                      },

                      gap: 2,

                      mb: 3,
                    }}
                  >
                    {/* PICKUP */}

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",

                          mb: 0.5,
                        }}
                      >
                        Pickup Date
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {booking.pickupDate}
                      </Typography>
                    </Box>

                    {/* RETURN */}

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",

                          mb: 0.5,
                        }}
                      >
                        Return Date
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {booking.returnDate}
                      </Typography>
                    </Box>

                    {/* DAYS */}

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",

                          mb: 0.5,
                        }}
                      >
                        Rental Duration
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {booking.days} days
                      </Typography>
                    </Box>

                    {/* PRICE */}

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",

                          mb: 0.5,
                        }}
                      >
                        Price Per Day
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        ${booking.pricePerDay}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider
                    sx={{
                      mb: 3,
                    }}
                  />

                  {/* ==========================
                      LOCATIONS
                  ========================== */}

                  <Typography
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                    }}
                  >
                    Pickup & Return
                  </Typography>

                  <Stack
                    spacing={2}
                    sx={{
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",
                          mb: 0.5,
                        }}
                      >
                        Pickup Location
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {booking.pickupLocation || "Not provided"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",
                          mb: 0.5,
                        }}
                      >
                        Return Location
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {booking.returnLocation || "Not provided"}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider
                    sx={{
                      mb: 3,
                    }}
                  />

                  {/* ==========================
                      CUSTOMER
                  ========================== */}

                  <Typography
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                    }}
                  >
                    Customer Information
                  </Typography>

                  <Stack
                    spacing={1.5}
                    sx={{
                      mb: 3,
                    }}
                  >
                    <Typography>
                      <strong>Name:</strong>{" "}
                      {booking.userName || booking.name || "Not provided"}
                    </Typography>

                    <Typography
                      sx={{
                        wordBreak: "break-word",
                      }}
                    >
                      <strong>Email:</strong>{" "}
                      {booking.userEmail || booking.email || "Not provided"}
                    </Typography>

                    <Typography>
                      <strong>Phone:</strong> {booking.phone || "Not provided"}
                    </Typography>
                  </Stack>

                  <Divider
                    sx={{
                      mb: 3,
                    }}
                  />

                  {/* ==========================
                      TOTAL
                  ========================== */}

                  <Box
                    sx={{
                      display: "flex",

                      justifyContent: "space-between",

                      alignItems: "center",

                      gap: 2,

                      flexWrap: "wrap",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",
                        }}
                      >
                        Total Price
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 900,

                          fontSize: "1.5rem",

                          color: "#111827",
                        }}
                      >
                        ${booking.totalPrice}
                      </Typography>
                    </Box>

                    {/* <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/my-bookings/${booking.id}`
                        )
                      }
                      sx={{
                        textTransform:
                          "none",

                        fontWeight: 700,

                        borderColor:
                          "#111827",

                        color:
                          "#111827",

                        "&:hover": {
                          borderColor:
                            "#111827",
                        },
                      }}
                    >
                      View Details
                    </Button> */}
                    <Button sx={{
                        textTransform:
                          "none",

                        fontWeight: 700,

                        borderColor:
                          "#111827",

                        color:
                          "#111827",

                        "&:hover": {
                          borderColor:
                            "#111827",
                        },
                      }}
                      onClick={() => navigate(`/booking-details/${booking.id}`)}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default MyBookings;
