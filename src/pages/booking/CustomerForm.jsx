import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
function CustomerForm({
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
  loading,
}) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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

      <Stack spacing={2} sx={{ mb: 4 }}>
        {/* NAME */}

        <TextField
          fullWidth
          label="Full Name"
          placeholder="Enter your full name"
          {...register("name", {
            required: "Full name is required.",

            minLength: {
              value: 3,
              message: "Name must contain at least 3 characters.",
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* EMAIL */}

        <TextField
          fullWidth
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required.",

            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

              message: "Please enter a valid email address.",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* PHONE */}

        <TextField
          fullWidth
          label="Phone Number"
          placeholder="03XX XXXXXXX"
          {...register("phone", {
            required: "Phone number is required.",

            pattern: {
              value: /^[0-9+\-\s()]{10,15}$/,

              message: "Please enter a valid phone number.",
            },
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        {/* DATE OF BIRTH */}
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{
            required: "Date of birth is required",
            validate: (value) => {
              if (!value) return true;

              return (
                dayjs(value).isBefore(dayjs(), "day") ||
                "Date of birth must be before today"
              );
            },
          }}
          render={({ field }) => (
            <DatePicker
              label="Date of Birth"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.format("YYYY-MM-DD") : "")
              }
              maxDate={dayjs().subtract(1, "day")}
              disableFuture
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(errors.dateOfBirth),
                  helperText: errors.dateOfBirth?.message,
                },
              }}
            />
          )}
        />

        {/* ADDRESS */}

        <TextField
          fullWidth
          label="Complete Address"
          placeholder="House / Street / Area"
          {...register("address", {
            required: "Address is required.",

            minLength: {
              value: 5,
              message: "Please enter your complete address.",
            },
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        {/* CITY */}

        <TextField
          fullWidth
          label="City"
          placeholder="Enter your city"
          {...register("city", {
            required: "City is required.",
          })}
          error={!!errors.city}
          helperText={errors.city?.message}
        />

        {/* COUNTRY */}

        <TextField
          fullWidth
          label="Country"
          {...register("country", {
            required: "Country is required.",
          })}
          error={!!errors.country}
          helperText={errors.country?.message}
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

      <Stack spacing={2} sx={{ mb: 4 }}>
        {/* LICENSE NUMBER */}

        <TextField
          fullWidth
          label="License Number"
          placeholder="Example: ABC-1234567-8"
          InputLabelProps={{ shrink: true }}
          {...register("licenseNumber", {
            required: "License number is required",
            minLength: {
              value: 5,
              message: "License number must be at least 5 characters",
            },
            maxLength: {
              value: 20,
              message: "License number must not exceed 20 characters",
            },
          })}
          error={Boolean(errors.licenseNumber)}
          helperText={errors.licenseNumber?.message}
        />

        {/* LICENSE EXPIRY */}
        <Controller
          name="licenseExpiry"
          control={control}
          rules={{
            required: "License expiry date is required",
            validate: (value) => {
              if (!value) return true;

              return (
                dayjs(value).isAfter(dayjs(), "day") ||
                "License expiry date must be after today"
              );
            },
          }}
          render={({ field }) => (
            <DatePicker
              label="License Expiry Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.format("YYYY-MM-DD") : "");
              }}
              minDate={dayjs().add(1, "day")}
              disablePast
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(errors.licenseExpiry),
                  helperText: errors.licenseExpiry?.message,
                },
              }}
            />
          )}
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

      <Stack spacing={2} sx={{ mb: 4 }}>
        {/* PICKUP */}

        <TextField
          fullWidth
          label="Pickup Location"
          placeholder="Where will you collect the car?"
          {...register("pickupLocation", {
            required: "Pickup location is required.",
          })}
          error={!!errors.pickupLocation}
          helperText={errors.pickupLocation?.message}
        />

        {/* RETURN */}

        <TextField
          fullWidth
          label="Return Location"
          placeholder="Where will you return the car?"
          {...register("returnLocation", {
            required: "Return location is required.",
          })}
          error={!!errors.returnLocation}
          helperText={errors.returnLocation?.message}
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
            <CircularProgress size={22} color="inherit" sx={{ mr: 1 }} />
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
