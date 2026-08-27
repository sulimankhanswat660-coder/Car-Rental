import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PeopleIcon from "@mui/icons-material/People";

import { doc, getDoc } from "firebase/firestore";

import { useNavigate, useParams } from "react-router-dom";

import { db } from "../../lib/Firebase";
import CarBooking from "../booking/CarBooking";

function CarDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [car, setCar] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // GET CAR FROM FIRESTORE
  // ==========================================

  useEffect(() => {
    const getCar = async () => {
      try {
        setLoading(true);

        const carRef = doc(db, "cars", id);

        const carSnapshot = await getDoc(carRef);

        if (carSnapshot.exists()) {
          setCar({
            id: carSnapshot.id,
            ...carSnapshot.data(),
          });
        } else {
          setError("Car not found.");
        }
      } catch (error) {
        console.error("Error getting car:", error);

        setError("Failed to load car.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCar();
    }
  }, [id]);

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

  if (error || !car) {
    return (
      <Container
        sx={{
          py: 8,
        }}
      >
        <Alert severity="error">{error || "Car not found."}</Alert>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/cars")}
          sx={{
            mt: 3,

            textTransform: "none",
          }}
        >
          Back to Cars
        </Button>
      </Container>
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
        {/* BACK BUTTON */}

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/cars")}
          sx={{
            mb: 3,

            color: "#111827",

            textTransform: "none",

            fontWeight: 600,
          }}
        >
          Back to Cars
        </Button>

        {/* MAIN CONTENT */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1.2fr 1fr",
            },

            gap: {
              xs: 3,
              md: 5,
            },
          }}
        >
          {/* ===============================
              IMAGE
          =============================== */}

          <Box
            component="img"
            src={car.image}
            alt={car.name}
            sx={{
              width: "100%",

              height: {
                xs: 250,
                sm: 400,
                md: 500,
              },

              objectFit: "cover",

              borderRadius: 3,

              display: "block",
            }}
          />

          {/* ===============================
              DETAILS
          =============================== */}

          <Box
            sx={{
              backgroundColor: "#ffffff",

              borderRadius: 3,

              p: {
                xs: 3,
                md: 4,
              },

              boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
            }}
          >
            {/* CATEGORY */}

            <Chip
              label={car.category}
              size="small"
              sx={{
                mb: 2,

                fontWeight: 600,
              }}
            />

            {/* NAME */}

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,

                color: "#111827",

                fontSize: {
                  xs: "2rem",
                  md: "2.8rem",
                },
              }}
            >
              {car.name}
            </Typography>

            {/* PRICE */}

            <Box
              sx={{
                mt: 2,

                display: "flex",

                alignItems: "baseline",

                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.8rem",

                  fontWeight: 800,

                  color: "#111827",
                }}
              >
                ${car.price}
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                }}
              >
                / day
              </Typography>
            </Box>

            <Divider
              sx={{
                my: 3,
              }}
            />

            {/* CAR INFORMATION */}

            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#6b7280",
                    fontSize: "0.85rem",
                  }}
                >
                  Year
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {car.year}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
               
              >
                <Typography
                  sx={{
                    color: "#6b7280",

                    fontSize: "0.85rem",
                  }}
                >
                  Seats
                </Typography>

              <Box   sx={{
                  display: "flex",

                 alignItems:
                    "center",

                   gap: 1,
               }}> 
                  <Typography
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {car.seats}
                  </Typography>
                  <PeopleIcon />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#6b7280",

                    fontSize: "0.85rem",
                  }}
                >
                  Transmission
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {car.transmission}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#6b7280",

                    fontSize: "0.85rem",
                  }}
                >
                  Fuel
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {car.fuel}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#6b7280",

                    fontSize: "0.85rem",
                  }}
                >
                  Mileage
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {car.mileage}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#6b7280",

                    fontSize: "0.85rem",
                  }}
                >
                  Location
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {car.location}
                </Typography>
              </Box>
            </Stack>

            <Divider
              sx={{
                my: 3,
              }}
            />

            {/* DESCRIPTION */}

            <Typography
              sx={{
                fontWeight: 700,

                mb: 1,
              }}
            >
              Description
            </Typography>

            <Typography
              sx={{
                color: "#6b7280",

                lineHeight: 1.8,
              }}
            >
              {car.description}
            </Typography>
          </Box>
        </Box>

        {/* =================================
            BOOKING SECTION

            IMPORTANT:
            car is now loaded from Firestore
        ================================= */}

        <CarBooking car={car} />
      </Container>
    </Box>
  );
}

export default CarDetail;
