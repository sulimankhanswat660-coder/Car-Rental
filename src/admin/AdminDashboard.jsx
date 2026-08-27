import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../lib/Firebase";

import {
  Dashboard,
  DirectionsCar,
  CheckCircle,
  Cancel,
  AttachMoney,
  Visibility,
} from "@mui/icons-material";

function AdminDashboard() {
  // ==========================================
  // STATE
  // ==========================================

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [detailOpen, setDetailOpen] = useState(false);

  const [cancelling, setCancelling] = useState(false);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ==========================================
  // GET ALL BOOKINGS
  // ==========================================

  const getBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const bookingsRef = collection(db, "bookings");

      const bookingsQuery = query(bookingsRef, orderBy("createdAt", "desc"));

      const snapshot = await getDocs(bookingsQuery);

      const bookingList = snapshot.docs.map((booking) => ({
        id: booking.id,
        ...booking.data(),
      }));

      setBookings(bookingList);
    } catch (error) {
      console.error("Error loading bookings:", error);

      // Fallback without orderBy
      try {
        const snapshot = await getDocs(collection(db, "bookings"));

        const bookingList = snapshot.docs.map((booking) => ({
          id: booking.id,
          ...booking.data(),
        }));

        setBookings(bookingList);
      } catch (fallbackError) {
        console.error(fallbackError);

        setError("Failed to load bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD BOOKINGS
  // ==========================================

  useEffect(() => {
    getBookings();
  }, []);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled",
  ).length;

  const totalRevenue = bookings
    .filter((booking) => booking.status === "confirmed")
    .reduce((total, booking) => total + Number(booking.totalPrice || 0), 0);

  // ==========================================
  // VIEW DETAILS
  // ==========================================

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setDetailOpen(true);
  };

  // ==========================================
  // CLOSE DETAILS
  // ==========================================

  const handleCloseDetails = () => {
    setDetailOpen(false);
    setSelectedBooking(null);
  };

  // ==========================================
  // CANCEL BOOKING
  // ==========================================

  const handleCancelBooking = async () => {
    if (!selectedBooking) {
      return;
    }

    try {
      setCancelling(true);

      const bookingRef = doc(db, "bookings", selectedBooking.id);

      await updateDoc(bookingRef, {
        status: "cancelled",
      });

      // Update UI
      setBookings((previous) =>
        previous.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                status: "cancelled",
              }
            : booking,
        ),
      );

      setSelectedBooking((previous) =>
        previous
          ? {
              ...previous,
              status: "cancelled",
            }
          : null,
      );
    } catch (error) {
      console.error("Cancel booking error:", error);

      setError("Failed to cancel booking.");
    } finally {
      setCancelling(false);
    }
  };

  // ==========================================
  // STATUS CHIP
  // ==========================================

  const getStatusChip = (status) => {
    if (status === "confirmed") {
      return (
        <Chip
          label="Confirmed"
          size="small"
          color="success"
          icon={<CheckCircle />}
        />
      );
    }

    if (status === "cancelled") {
      return (
        <Chip label="Cancelled" size="small" color="error" icon={<Cancel />} />
      );
    }

    return <Chip label={status || "Unknown"} size="small" />;
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
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />

          <Typography
            sx={{
              color: "#6b7280",
            }}
          >
            Loading dashboard...
          </Typography>
        </Stack>
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
          xs: 3,
          md: 5,
        },
      }}
    >
      <Container maxWidth="xl">
        {/* ====================================
            HEADER
        ==================================== */}

        <Box sx={{ mb: 4 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#111827",
                color: "#ffffff",
              }}
            >
              <Dashboard />
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                  fontSize: {
                    xs: "1.8rem",
                    md: "2.2rem",
                  },
                }}
              >
                Admin Dashboard
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  mt: 0.5,
                }}
              >
                Manage your car rental bookings.
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* ====================================
            ERROR
        ==================================== */}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* ====================================
            STATISTICS
        ==================================== */}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* TOTAL BOOKINGS */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "0.9rem",
                      }}
                    >
                      Total Bookings
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 800,
                      
                      }}
                    >
                      {totalBookings}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f3f4f6",
                    }}
                  >
                    <DirectionsCar />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* CONFIRMED */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "0.9rem",
                      }}
                    >
                      Confirmed
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 800,
                      }}
                    >
                      {confirmedBookings}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#dcfce7",
                      color: "#16a34a",
                    }}
                  >
                    <CheckCircle />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* CANCELLED */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "0.9rem",
                      }}
                    >
                      Cancelled
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 800,
                      }}
                    >
                      {cancelledBookings}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fee2e2",
                      color: "#dc2626",
                    }}
                  >
                    <Cancel />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* REVENUE */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "0.9rem",
                      }}
                    >
                      Total Revenue
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 800,
                      }}
                    >
                      ${totalRevenue.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#e0e7ff",
                    }}
                  >
                    <AttachMoney />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ====================================
            BOOKINGS
        ==================================== */}

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
              }}
            >
              All Bookings
            </Typography>

            <Typography
              sx={{
                color: "#6b7280",
                fontSize: "0.9rem",
                mt: 0.5,
              }}
            >
              View and manage all customer bookings.
            </Typography>
          </Box>

          <Divider />

          {/* =================================
              NO BOOKINGS
          ================================= */}

          {bookings.length === 0 ? (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
              }}
            >
              <DirectionsCar
                sx={{
                  fontSize: 50,
                  color: "#9ca3af",
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                No bookings found
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  mt: 1,
                }}
              >
                There are currently no bookings.
              </Typography>
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                overflowX: "auto",
              }}
            >
              <Table
                sx={{
                  minWidth: 950,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      Customer
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      Car
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      Rental Dates
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      Days
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      Total
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      Status
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} hover>
                      {/* CUSTOMER */}

                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          {booking.userName || booking.name || "Unknown"}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "#6b7280",
                          }}
                        >
                          {booking.userEmail || booking.email || ""}
                        </Typography>
                      </TableCell>

                      {/* CAR */}

                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          {booking.carImage && (
                            <Box
                              component="img"
                              src={booking.carImage}
                              alt={booking.carName}
                              sx={{
                                width: 55,
                                height: 40,
                                objectFit: "cover",
                                borderRadius: 1.5,
                              }}
                            />
                          )}

                          <Typography
                            sx={{
                              fontWeight: 700,
                            }}
                          >
                            {booking.carName || "Unknown Car"}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* DATES */}

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                          }}
                        >
                          {booking.pickupDate}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: "#6b7280",
                          }}
                        >
                          to {booking.returnDate}
                        </Typography>
                      </TableCell>

                      {/* DAYS */}

                      <TableCell>{booking.days || 0}</TableCell>

                      {/* TOTAL */}

                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 800,
                          }}
                        >
                          ${Number(booking.totalPrice || 0).toLocaleString()}
                        </Typography>
                      </TableCell>

                      {/* STATUS */}

                      <TableCell>{getStatusChip(booking.status)}</TableCell>

                      {/* ACTION */}

                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Visibility />}
                          onClick={() => handleViewDetails(booking)}
                          sx={{
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Container>

      {/* ======================================
          BOOKING DETAIL DIALOG
      ====================================== */}

      <Dialog
        open={detailOpen}
        onClose={cancelling ? undefined : handleCloseDetails}
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
          }}
        >
          Booking Details
        </DialogTitle>

        <DialogContent dividers>
          {selectedBooking && (
            <Stack spacing={2.5}>
              {/* CAR */}

              <Stack direction="column" spacing={2} alignItems="center">
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                    }}
                  >
                    {selectedBooking.carName}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6b7280",
                    }}
                  >
                    ${selectedBooking.pricePerDay} / day
                  </Typography>
                </Box>
                {selectedBooking.carImage && (
                  <Box
                    component="img"
                    src={selectedBooking.carImage || selectedBooking.roomImage}
                    alt={selectedBooking.carName || "Car"}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    sx={{
                      width: "100%",
                      height: 200,
                      mt: 1,
                      mb: 1,
                      borderRadius: 2,
                      objectFit: "cover",
                      display:
                        selectedBooking.carImage || selectedBooking.roomImage
                          ? "block"
                          : "none",
                    }}
                  />
                )}
              </Stack>

              <Divider />

              {/* STATUS */}

              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Booking Status
                </Typography>

                {getStatusChip(selectedBooking.status)}
              </Box>

              <Divider />

              {/* CUSTOMER */}

              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    mb: 1.5,
                  }}
                >
                  Customer Information
                </Typography>

                <Stack spacing={1}>
                  <Typography>
                    <strong>Name:</strong>{" "}
                    {selectedBooking.userName || selectedBooking.name || "N/A"}
                  </Typography>

                  <Typography>
                    <strong>Email:</strong>{" "}
                    {selectedBooking.userEmail ||
                      selectedBooking.email ||
                      "N/A"}
                  </Typography>

                  <Typography>
                    <strong>Phone:</strong> {selectedBooking.phone || "N/A"}
                  </Typography>

                  <Typography>
                    <strong>Date of Birth:</strong>{" "}
                    {selectedBooking.dateOfBirth || "N/A"}
                  </Typography>

                  <Typography>
                    <strong>Address:</strong> {selectedBooking.address || "N/A"}
                  </Typography>

                  <Typography>
                    <strong>City:</strong> {selectedBooking.city || "N/A"}
                  </Typography>

                  <Typography>
                    <strong>Country:</strong> {selectedBooking.country || "N/A"}
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* RENTAL */}

              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    mb: 1.5,
                  }}
                >
                  Rental Information
                </Typography>

                <Stack spacing={1}>
                  <Typography>
                    <strong>Pickup Date:</strong> {selectedBooking.pickupDate}
                  </Typography>

                  <Typography>
                    <strong>Return Date:</strong> {selectedBooking.returnDate}
                  </Typography>

                  <Typography>
                    <strong>Rental Days:</strong> {selectedBooking.days}
                  </Typography>

                  <Typography>
                    <strong>Pickup Location:</strong>{" "}
                    {selectedBooking.pickupLocation || "N/A"}
                  </Typography>

                  <Typography>
                    <strong>Return Location:</strong>{" "}
                    {selectedBooking.returnLocation || "N/A"}
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* DRIVER */}

              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    mb: 1.5,
                  }}
                >
                  Driving Information
                </Typography>

                <Stack spacing={1}>
                  <Typography>
                    <strong>License Number:</strong>{" "}
                    {selectedBooking.licenseNumber || "N/A"}
                  </Typography>

                  <Typography>
                    <strong>License Expiry:</strong>{" "}
                    {selectedBooking.licenseExpiry || "N/A"}
                  </Typography>
                </Stack>
              </Box>

              {/* SPECIAL REQUEST */}

              {selectedBooking.specialRequest && (
                <>
                  <Divider />

                  <Box>
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
                      }}
                    >
                      {selectedBooking.specialRequest}
                    </Typography>
                  </Box>
                </>
              )}

              <Divider />

              {/* TOTAL */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                  }}
                >
                  Total Price
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: "1.5rem",
                  }}
                >
                  ${Number(selectedBooking.totalPrice || 0).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={handleCloseDetails}
            disabled={cancelling}
            sx={{
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Close
          </Button>

          {selectedBooking && selectedBooking.status === "confirmed" && (
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelBooking}
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
                "Cancel Booking"
              )}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboard;
