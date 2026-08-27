import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";

function BookingForm({
  register,
  errors,
  watch,
  handleSubmit,
  onSubmit,
  loading,
}) {
  const pickupDate = watch("pickupDate");

  const today = new Date()
    .toISOString()
    .split("T")[0];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* RENTAL DATES */}

      <Typography
        sx={{
          fontWeight: 800,
          mb: 2,
        }}
      >
        Rental Dates
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {/* PICKUP DATE */}

        <TextField
          fullWidth
          type="date"
          label="Pickup Date"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: today,
          }}
          error={!!errors.pickupDate}
          helperText={
            errors.pickupDate?.message
          }
          {...register("pickupDate", {
            required:
              "Pickup date is required.",
          })}
        />

        {/* RETURN DATE */}

        <TextField
          fullWidth
          type="date"
          label="Return Date"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: pickupDate || today,
          }}
          error={!!errors.returnDate}
          helperText={
            errors.returnDate?.message
          }
          {...register("returnDate", {
            required:
              "Return date is required.",

            validate: (value) => {
              if (
                pickupDate &&
                value <= pickupDate
              ) {
                return "Return date must be after pickup date.";
              }

              return true;
            },
          })}
        />
      </Stack>

      {/* CHECK AVAILABILITY BUTTON */}

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          py: 1.5,
          borderRadius: 2,
          backgroundColor: "#111827",
          textTransform: "none",
          fontWeight: 700,
        }}
      >
        {loading ? (
          <>
            <CircularProgress
              size={22}
              color="inherit"
              sx={{ mr: 1 }}
            />

            Checking Availability...
          </>
        ) : (
          "Check Availability"
        )}
      </Button>
    </Box>
  );
}

export default BookingForm;




