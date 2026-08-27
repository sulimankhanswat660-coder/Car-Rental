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

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../lib/Firebase";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";

function Login() {
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
    reset,
  } = useForm();

  // =========================
  // LOGIN
  // =========================

  const onSubmit = async (data) => {
    setError("");

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      switch (error.code) {
        case "auth/invalid-credential":
          setError(
            "Incorrect email or password."
          );
          break;

        case "auth/user-not-found":
          setError(
            "No account found with this email."
          );
          break;

        case "auth/wrong-password":
          setError(
            "Incorrect password."
          );
          break;

        case "auth/invalid-email":
          setError(
            "Please enter a valid email."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many failed attempts. Please try again later."
          );
          break;

        default:
          setError(
            "Unable to login. Please try again."
          );
      }
    } finally {
      setLoading(false);
      reset()
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

            border:
              "1px solid #e5e7eb",
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
              Welcome Back
            </Typography>

            <Typography
              sx={{
                mt: 1,

                color: "#6b7280",
              }}
            >
              Login to continue renting cars.
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

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >

            {/* =========================
                EMAIL
            ========================= */}

            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required:
                  "Email is required",

                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                  message:
                    "Please enter a valid email",
                },
              })}
              error={Boolean(errors.email)}
              helperText={
                errors.email?.message
              }
              sx={{
                mb: 2,
              }}
            />

            {/* =========================
                PASSWORD
            ========================= */}

            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required:
                  "Password is required",

                minLength: {
                  value: 6,

                  message:
                    "Password must be at least 6 characters",
                },
              })}
              error={Boolean(errors.password)}
              helperText={
                errors.password?.message
              }
              sx={{
                mb: 3,
              }}
            />

            {/* =========================
                LOGIN BUTTON
            ========================= */}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.4,

                borderRadius: "9px",

                backgroundColor:
                  "#111827",

                textTransform: "none",

                fontWeight: 700,

                fontSize: "1rem",

                "&:hover": {
                  backgroundColor:
                    "#374151",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Login"
              )}
            </Button>
          </Box>

          {/* =========================
              SIGN UP
          ========================= */}

          <Box
            sx={{
              textAlign: "center",

              mt: 3,
            }}
          >
            <Typography
              component="span"
              color="text.secondary"
            >
              Don't have an account?{" "}
            </Typography>

            <MuiLink
              component={Link}
              to="/signup"
              underline="hover"
              sx={{
                fontWeight: 700,

                color: "#111827",
              }}
            >
              Sign Up
            </MuiLink>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}

export default Login;