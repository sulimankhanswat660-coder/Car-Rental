import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
function BookingForm({
  register,
  control,
  errors,
  watch,
  handleSubmit,
  onSubmit,
  loading,
}) {
  const pickupDate = watch("pickupDate");

  const today = new Date().toISOString().split("T")[0];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
        <Controller
          name="pickupDate"
          control={control}
          rules={{
            required: "Pickup date is required",
            validate: (value) => {
              if (!value) return true;

              return (
                !dayjs(value).isBefore(dayjs().startOf("day"), "day") ||
                "Pickup date cannot be in the past"
              );
            },
          }}
          render={({ field }) => (
            <DatePicker
              label="Pickup Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.format("YYYY-MM-DD") : "")
              }
              minDate={dayjs().startOf("day")}
              disablePast
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(errors.pickupDate),
                  helperText: errors.pickupDate?.message,
                },
              }}
            />
          )}
        />

        {/* RETURN DATE */}

        <Controller
  name="returnDate"
  control={control}
  rules={{
    required: "Return date is required",
    validate: (value) => {
      if (!value) return true;

      const pickupDate = watch("pickupDate");
      const selectedReturn = dayjs(value).startOf("day");
      const today = dayjs().startOf("day");

      if (selectedReturn.isBefore(today, "day")) {
        return "Return date cannot be in the past";
      }

      if (
        pickupDate &&
        !selectedReturn.isAfter(dayjs(pickupDate), "day")
      ) {
        return "Return date must be after the pickup date";
      }

      return true;
    },
  }}
  render={({ field }) => {
    const pickupDate = watch("pickupDate");

    return (
      <DatePicker
        label="Return Date"
        value={field.value ? dayjs(field.value) : null}
        onChange={(date) =>
          field.onChange(date ? date.format("YYYY-MM-DD") : "")
        }
        minDate={
          pickupDate
            ? dayjs(pickupDate).add(1, "day")
            : dayjs().startOf("day")
        }
        disablePast
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            error: Boolean(errors.returnDate),
            helperText: errors.returnDate?.message,
          },
        }}
      />
    );
  }}
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
            <CircularProgress size={22} color="inherit" sx={{ mr: 1 }} />
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
