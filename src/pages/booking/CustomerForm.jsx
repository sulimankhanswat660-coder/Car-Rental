import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";

function CustomerForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  loading,
}) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* =====================================
          CUSTOMER INFORMATION
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
        spacing={2}
        sx={{ mb: 4 }}
      >
        {/* NAME */}

        <TextField
          fullWidth
          label="Full Name"
          placeholder="Enter your full name"
          {...register("name", {
            required:
              "Full name is required.",

            minLength: {
              value: 3,
              message:
                "Name must contain at least 3 characters.",
            },
          })}
          error={!!errors.name}
          helperText={
            errors.name?.message
          }
        />

        {/* EMAIL */}

        <TextField
          fullWidth
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          {...register("email", {
            required:
              "Email is required.",

            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

              message:
                "Please enter a valid email address.",
            },
          })}
          error={!!errors.email}
          helperText={
            errors.email?.message
          }
        />

        {/* PHONE */}

        <TextField
          fullWidth
          label="Phone Number"
          placeholder="03XX XXXXXXX"
          {...register("phone", {
            required:
              "Phone number is required.",

            pattern: {
              value:
                /^[0-9+\-\s()]{10,15}$/,

              message:
                "Please enter a valid phone number.",
            },
          })}
          error={!!errors.phone}
          helperText={
            errors.phone?.message
          }
        />

        {/* DATE OF BIRTH */}

        <TextField
          fullWidth
          type="date"
          label="Date of Birth"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("dateOfBirth", {
            required:
              "Date of birth is required.",

            validate: (value) => {
              const dob = new Date(
                `${value}T00:00:00`
              );

              const todayDate =
                new Date();

              let age =
                todayDate.getFullYear() -
                dob.getFullYear();

              const month =
                todayDate.getMonth() -
                dob.getMonth();

              if (
                month < 0 ||
                (month === 0 &&
                  todayDate.getDate() <
                    dob.getDate())
              ) {
                age--;
              }

              if (age < 18) {
                return "You must be at least 18 years old.";
              }

              return true;
            },
          })}
          error={!!errors.dateOfBirth}
          helperText={
            errors.dateOfBirth?.message
          }
        />

        {/* ADDRESS */}

        <TextField
          fullWidth
          label="Complete Address"
          placeholder="House / Street / Area"
          {...register("address", {
            required:
              "Address is required.",

            minLength: {
              value: 5,
              message:
                "Please enter your complete address.",
            },
          })}
          error={!!errors.address}
          helperText={
            errors.address?.message
          }
        />

        {/* CITY */}

        <TextField
          fullWidth
          label="City"
          placeholder="Enter your city"
          {...register("city", {
            required:
              "City is required.",
          })}
          error={!!errors.city}
          helperText={
            errors.city?.message
          }
        />

        {/* COUNTRY */}

        <TextField
          fullWidth
          label="Country"
          {...register("country", {
            required:
              "Country is required.",
          })}
          error={!!errors.country}
          helperText={
            errors.country?.message
          }
        />
      </Stack>

      {/* =====================================
          DRIVING INFORMATION
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
        spacing={2}
        sx={{ mb: 4 }}
      >
        {/* LICENSE NUMBER */}

        <TextField
          fullWidth
          label="Driving License Number"
          placeholder="Enter your license number"
          {...register("licenseNumber", {
            required:
              "License number is required.",

            minLength: {
              value: 5,
              message:
                "Please enter a valid license number.",
            },
          })}
          error={
            !!errors.licenseNumber
          }
          helperText={
            errors.licenseNumber?.message
          }
        />

        {/* LICENSE EXPIRY */}

        <TextField
          fullWidth
          type="date"
          label="License Expiry Date"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: today,
          }}
          {...register("licenseExpiry", {
            required:
              "License expiry is required.",

            validate: (value) => {
              if (value <= today) {
                return "Your driving license must not be expired.";
              }

              return true;
            },
          })}
          error={
            !!errors.licenseExpiry
          }
          helperText={
            errors.licenseExpiry?.message
          }
        />
      </Stack>

      {/* =====================================
          PICKUP & RETURN
      ===================================== */}

      <Typography
        sx={{
          fontWeight: 800,
          mb: 2,
        }}
      >
        Pickup & Return Location
      </Typography>

      <Stack
        spacing={2}
        sx={{ mb: 4 }}
      >
        {/* PICKUP */}

        <TextField
          fullWidth
          label="Pickup Location"
          placeholder="Where will you collect the car?"
          {...register("pickupLocation", {
            required:
              "Pickup location is required.",
          })}
          error={
            !!errors.pickupLocation
          }
          helperText={
            errors.pickupLocation?.message
          }
        />

        {/* RETURN */}

        <TextField
          fullWidth
          label="Return Location"
          placeholder="Where will you return the car?"
          {...register("returnLocation", {
            required:
              "Return location is required.",
          })}
          error={
            !!errors.returnLocation
          }
          helperText={
            errors.returnLocation?.message
          }
        />
      </Stack>

      {/* =====================================
          SPECIAL REQUEST
      ===================================== */}

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Special Request"
        placeholder="Any special request or additional information?"
        {...register("specialRequest")}
        sx={{ mb: 4 }}
      />

      {/* =====================================
          SUBMIT
      ===================================== */}

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

          "&:hover": {
            backgroundColor: "#374151",
          },
        }}
      >
        {loading ? (
          <>
            <CircularProgress
              size={22}
              color="inherit"
              sx={{ mr: 1 }}
            />

            Preparing Booking...
          </>
        ) : (
          "Continue to Booking Summary"
        )}
      </Button>
    </Box>
  );
}

export default CustomerForm;