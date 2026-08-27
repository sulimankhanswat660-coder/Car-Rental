import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";

function BookingSummary({
  bookingDetails,
  confirming,
  onConfirm,
  onChange,
}) {
  return (
    <Box>
      {/* =====================================
          TITLE
      ===================================== */}

      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "1.25rem",
          mb: 3,
        }}
      >
        Review Your Booking
      </Typography>

      {/* =====================================
          CAR
      ===================================== */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={bookingDetails.carImage}
          alt={bookingDetails.carName}
          sx={{
            width: {
              xs: 90,
              sm: 120,
            },

            height: {
              xs: 65,
              sm: 80,
            },

            objectFit: "cover",

            borderRadius: 2,

            flexShrink: 0,
          }}
        />

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              wordBreak: "break-word",
            }}
          >
            {bookingDetails.carName}
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
            }}
          >
            ${bookingDetails.pricePerDay} / day
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* =====================================
          RENTAL DETAILS
      ===================================== */}

      <Typography
        sx={{
          fontWeight: 800,
          mb: 2,
        }}
      >
        Rental Details
      </Typography>

      <Stack
        spacing={1.5}
        sx={{ mb: 3 }}
      >
        <Typography>
          <strong>Pickup:</strong>{" "}
          {bookingDetails.pickupDate}
        </Typography>

        <Typography>
          <strong>Return:</strong>{" "}
          {bookingDetails.returnDate}
        </Typography>

        <Typography>
          <strong>Rental Days:</strong>{" "}
          {bookingDetails.days} days
        </Typography>

        <Typography
          sx={{
            wordBreak: "break-word",
          }}
        >
          <strong>
            Pickup Location:
          </strong>{" "}
          {bookingDetails.pickupLocation}
        </Typography>

        <Typography
          sx={{
            wordBreak: "break-word",
          }}
        >
          <strong>
            Return Location:
          </strong>{" "}
          {bookingDetails.returnLocation}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* =====================================
          CUSTOMER
      ===================================== */}

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
        sx={{ mb: 3 }}
      >
        <Typography>
          <strong>Name:</strong>{" "}
          {bookingDetails.name}
        </Typography>

        <Typography
          sx={{
            wordBreak: "break-word",
          }}
        >
          <strong>Email:</strong>{" "}
          {bookingDetails.email}
        </Typography>

        <Typography>
          <strong>Phone:</strong>{" "}
          {bookingDetails.phone}
        </Typography>

        <Typography>
          <strong>
            Date of Birth:
          </strong>{" "}
          {bookingDetails.dateOfBirth}
        </Typography>

        <Typography
          sx={{
            wordBreak: "break-word",
          }}
        >
          <strong>Address:</strong>{" "}
          {bookingDetails.address}
        </Typography>

        <Typography>
          <strong>City:</strong>{" "}
          {bookingDetails.city}
        </Typography>

        <Typography>
          <strong>Country:</strong>{" "}
          {bookingDetails.country}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* =====================================
          DRIVER
      ===================================== */}

      <Typography
        sx={{
          fontWeight: 800,
          mb: 2,
        }}
      >
        Driving Information
      </Typography>

      <Stack
        spacing={1.5}
        sx={{ mb: 3 }}
      >
        <Typography>
          <strong>
            License Number:
          </strong>{" "}
          {bookingDetails.licenseNumber}
        </Typography>

        <Typography>
          <strong>
            License Expiry:
          </strong>{" "}
          {bookingDetails.licenseExpiry}
        </Typography>
      </Stack>

      {/* =====================================
          SPECIAL REQUEST
      ===================================== */}

      {bookingDetails.specialRequest && (
        <>
          <Divider sx={{ mb: 3 }} />

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
              mb: 3,
              wordBreak: "break-word",
            }}
          >
            {bookingDetails.specialRequest}
          </Typography>
        </>
      )}

      <Divider sx={{ mb: 2 }} />

      {/* =====================================
          TOTAL
      ===================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
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
            whiteSpace: "nowrap",
          }}
        >
          ${bookingDetails.totalPrice}
        </Typography>
      </Box>

      {/* =====================================
          BUTTONS
      ===================================== */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
      >
        {/* CHANGE */}

        <Button
          fullWidth
          variant="outlined"
          onClick={onChange}
          disabled={confirming}
          sx={{
            py: 1.4,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            color: "#111827",
            borderColor: "#d1d5db",

            "&:hover": {
              borderColor: "#111827",
            },
          }}
        >
          Change Information
        </Button>

        {/* CONFIRM */}

        <Button
          fullWidth
          variant="contained"
          onClick={onConfirm}
          disabled={confirming}
          sx={{
            py: 1.4,
            borderRadius: 2,
            backgroundColor: "#111827",
            textTransform: "none",
            fontWeight: 700,

            "&:hover": {
              backgroundColor: "#374151",
            },
          }}
        >
          {confirming ? (
            <>
              <CircularProgress
                size={22}
                color="inherit"
                sx={{ mr: 1 }}
              />

              Confirming...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </Stack>
    </Box>
  );
}

export default BookingSummary;