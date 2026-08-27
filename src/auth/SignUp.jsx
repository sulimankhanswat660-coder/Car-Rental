import { useState } from "react";

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { auth, db } from "../lib/Firebase";

function SignUp() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // REACT HOOK FORM
  // =========================

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  // =========================
  // SIGN UP
  // =========================

  const onSubmit = async (data) => {
    setError("");

    try {
      setLoading(true);

      // =========================
      // CREATE FIREBASE USER
      // =========================

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = userCredential.user;

      // =========================
      // SAVE USER IN FIRESTORE
      // =========================

      await setDoc(doc(db, "users", user.uid), {
        name: data.name,

        email: data.email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      // =========================
      // GO HOME
      // =========================

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email.");
          break;

        case "auth/weak-password":
          setError("Password is too weak.");
          break;

        default:
          setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor: "#f8fafc",

        display: "flex",

        alignItems: "center",

        py: 5,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },

            borderRadius: "18px",

            border: "1px solid #e5e7eb",
          }}
        >
          {/* =========================
              HEADER
          ========================= */}

          <Box
            sx={{
              textAlign: "center",

              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,

                color: "#111827",
              }}
            >
              Create Account
            </Typography>

            <Typography
              sx={{
                mt: 1,

                color: "#6b7280",
              }}
            >
              Create an account to rent your favorite cars.
            </Typography>
          </Box>

          {/* =========================
              FIREBASE ERROR
          ========================= */}

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

          {/* =========================
              FORM
          ========================= */}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* =========================
                NAME
            ========================= */}

            <TextField
              fullWidth
              label="Full Name"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",

                minLength: {
                  value: 3,

                  message: "Name must be at least 3 characters",
                },
              })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              sx={{
                mb: 2,
              }}
            />

            {/* =========================
                EMAIL
            ========================= */}

            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",

                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                  message: "Please enter a valid email",
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              sx={{
                mb: 2,
              }}
            />

            {/* =========================
                PASSWORD
            ========================= */}
            {/* PASSWORD */}

            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",

                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },

                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,

                  message:
                    "Password must contain at least 1 uppercase letter and 1 special character",
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              sx={{
                mb: 2,
              }}
            />

            {/* CONFIRM PASSWORD */}

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",

                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              sx={{
                mb: 3,
              }}
            />

            {/* =========================
                SIGN UP BUTTON
            ========================= */}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.4,

                borderRadius: "9px",

                backgroundColor: "#111827",

                textTransform: "none",

                fontWeight: 700,

                fontSize: "1rem",

                "&:hover": {
                  backgroundColor: "#374151",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>
          </Box>

          {/* =========================
              LOGIN
          ========================= */}

          <Box
            sx={{
              textAlign: "center",

              mt: 3,
            }}
          >
            <Typography component="span" color="text.secondary">
              Already have an account?{" "}
            </Typography>

            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              sx={{
                fontWeight: 700,

                color: "#111827",
              }}
            >
              Login
            </MuiLink>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignUp;
