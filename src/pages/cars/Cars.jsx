import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/Firebase";

function Cars() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH CARS FROM FIRESTORE
  // =========================

  useEffect(() => {
    const carsRef = collection(db, "cars");

    const unsubscribe = onSnapshot(
      carsRef,
      (snapshot) => {
        const carsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCars(carsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching cars:", error);

        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // =========================
  // FILTER CARS
  // =========================

  const filteredCars = cars.filter((car) => {
    const carName = car.name || "";

    const matchesSearch = carName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || car.category === category;

    return matchesSearch && matchesCategory;
  });

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        py: {
          xs: 5,
          md: 8,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              color: "#111827",
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Available Cars
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              color: "#6b7280",
              fontSize: {
                xs: "0.95rem",
                md: "1rem",
              },
            }}
          >
            Find the perfect car for your next journey.
          </Typography>
        </Box>

        {/* =========================
            FIRESTORE ERROR
        ========================= */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
            }}
          >
            {error}
          </Alert>
        )}

        {/* =========================
            SEARCH AND FILTER
        ========================= */}

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
            mb: 5,
          }}
        >
          {/* SEARCH */}

          <TextField
            fullWidth
            label="Search cars"
            placeholder="Search by car name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* CATEGORY */}

          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              width: {
                xs: "100%",
                sm: 220,
              },
            }}
          >
            <MenuItem value="All">
              All
            </MenuItem>

            <MenuItem value="Sedan">
              Sedan
            </MenuItem>

            <MenuItem value="SUV">
              SUV
            </MenuItem>

            <MenuItem value="Luxury">
              Luxury
            </MenuItem>

            <MenuItem value="Sports">
              Sports
            </MenuItem>

            <MenuItem value="Electric">
              Electric
            </MenuItem>

         

          </TextField>
        </Box>

        {/* =========================
            RESULT COUNT
        ========================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: "#6b7280",
              fontWeight: 600,
            }}
          >
            {filteredCars.length}{" "}
            {filteredCars.length === 1
              ? "car"
              : "cars"}{" "}
            found
          </Typography>

          {(search || category !== "All") && (
            <Button
              onClick={clearFilters}
              sx={{
                color: "#111827",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Clear Filters
            </Button>
          )}
        </Box>

        {/* =========================
            CARS GRID
        ========================= */}

        {filteredCars.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {/* ALL CARS ARE DISPLAYED HERE */}

            {filteredCars.map((car) => (
              <Card
                key={car.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.06)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 15px 35px rgba(0, 0, 0, 0.12)",
                  },
                }}
              >
                {/* =========================
                    CAR IMAGE
                ========================= */}

                <CardMedia
                  component="img"
                  image={car.image}
                  alt={car.name}
                  sx={{
                    height: {
                      xs: 210,
                      sm: 220,
                    },
                    objectFit: "cover",
                  }}
                />

                {/* =========================
                    CARD CONTENT
                ========================= */}

                <CardContent
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  {/* CATEGORY */}

                  <Chip
                    label={car.category}
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      mb: 1.5,
                      fontWeight: 600,
                    }}
                  />

                  {/* NAME */}

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    {car.name}
                  </Typography>

                  {/* BRAND */}

                  {car.brand && (
                    <Typography
                      sx={{
                        mt: 0.5,
                        color: "#6b7280",
                        fontSize: "0.9rem",
                      }}
                    >
                      {car.brand}
                    </Typography>
                  )}

                  {/* PRICE + BUTTON */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      mt: "auto",
                      pt: 2,
                    }}
                  >
                    {/* PRICE */}

                    <Box>
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 800,
                          color: "#111827",
                        }}
                      >
                        $
                        {car.pricePerDay || car.price}
                      </Typography>

                      <Typography
                        component="span"
                        sx={{
                          ml: 0.5,
                          color: "#6b7280",
                        }}
                      >
                        / day
                      </Typography>
                    </Box>

                    {/* VIEW CAR */}

                    <Button
                      component={Link}
                      to={`/cars/${car.id}`}
                      variant="contained"
                      sx={{
                        borderRadius: "9px",
                        backgroundColor: "#111827",
                        textTransform: "none",
                        fontWeight: 700,

                        "&:hover": {
                          backgroundColor: "#374151",
                        },
                      }}
                    >
                      View Car
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          /* =========================
             NO RESULTS
          ========================= */

          <Box
            sx={{
              textAlign: "center",
              py: 10,
              px: 2,
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <SearchIcon
              sx={{
                fontSize: 60,
                color: "#9ca3af",
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#111827",
              }}
            >
              No Cars Found
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#6b7280",
              }}
            >
              Try another car name or category.
            </Typography>

            <Button
              onClick={clearFilters}
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#111827",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "9px",

                "&:hover": {
                  backgroundColor: "#374151",
                },
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Cars;