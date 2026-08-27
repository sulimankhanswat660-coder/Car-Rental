import { Box, Container, Typography, Button, Stack } from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box
      sx={{
        maxWidth: "1440px",
        width: "100%",
        mx: "auto",
      }}
    >
      {/* ================= HERO SECTION ================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: 5,

          backgroundColor: "#f8fafc",
          position: "relative",
          backgroundImage: `
            linear-gradient(
              rgba(0, 0, 0, 0.58),
              rgba(0, 0, 0, 0.58)
            ),
            url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80")
          `,

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          color: "#ffffff",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "850px",
              mx: "auto",
            }}
          >
            {/* Small Label */}

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,

                px: 2,
                py: 1,

                mb: 3,

                borderRadius: "50px",

                backgroundColor: "#ffffff",

                border: "1px solid #e5e7eb",
              }}
            >
              <DirectionsCarIcon
                sx={{
                  fontSize: 20,
                  color: "#111827",
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                Your Journey Starts Here
              </Typography>
            </Box>

            {/* Main Heading */}
            <Typography
              component="h1"
              sx={{
                fontWeight: 900,

                color: "#ffffff",

                lineHeight: 1.1,

                letterSpacing: {
                  xs: "-1px",
                  md: "-2px",
                },

                fontSize: {
                  xs: "2.5rem",
                  sm: "3.5rem",
                  md: "5rem",
                },
              }}
            >
              Find Your Perfect Car
              <Box
                component="span"
                sx={{
                  display: "block",

                  color: "#ffffff",
                }}
              >
                For Your Next Journey
              </Box>
            </Typography>

            {/* Description */}

            <Typography
              sx={{
                maxWidth: "650px",
                mx: "auto",
                mt: 3,
                color: "#e5e7eb",
                lineHeight: 1.7,
                fontSize: {
                  xs: "1rem",
                  md: "1.1rem",
                },
              }}

              //     color: "#e5e7eb",
            >
              Rent reliable and comfortable cars at affordable prices. Choose
              from our wide range of vehicles and start your journey today.
            </Typography>

            {/* Buttons */}
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              justifyContent="center"
              sx={{
                mt: 4,
              }}
            >
              {/* Browse Cars */}

              <Button
                component={Link}
                to="/cars"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  color: "#111827",
                  textTransform: "none",
                  fontWeight: 700,

                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                  },
                }}
              >
                Browse Cars
              </Button>

              {/* Learn More */}

              <Button
                component={Link}
                to="/about"
                variant="outlined"
                size="large"
                sx={{
                  px: 3,
                  py: 1.5,

                  borderRadius: "10px",

                  borderColor: "#ffffff",

                  color: "#ffffff",

                  textTransform: "none",

                  fontWeight: 700,

                  "&:hover": {
                    borderColor: "#ffffff",

                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ================= WHY CHOOSE US ================= */}

      <Box
        sx={{
          py: {
            xs: 8,
            md: 12,
          },

          backgroundColor: "#ffffff",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              mb: 7,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,

                color: "#111827",

                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
              }}
            >
              Why Choose Us?
            </Typography>

            <Typography
              sx={{
                mt: 2,

                color: "#6b7280",

                maxWidth: "600px",

                mx: "auto",

                lineHeight: 1.7,
              }}
            >
              Everything you need for a simple, comfortable, and reliable car
              rental experience.
            </Typography>
          </Box>

          {/* Features */}

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
            {/* Feature 1 */}

            <Box
              sx={{
                p: 4,

                textAlign: "center",

                border: "1px solid #e5e7eb",

                borderRadius: "16px",

                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                },
              }}
            >
              <DirectionsCarIcon
                sx={{
                  fontSize: 45,
                  color: "#111827",
                  mb: 2,
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Wide Range of Cars
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  color: "#6b7280",
                  lineHeight: 1.6,
                }}
              >
                Choose from economy cars, SUVs, luxury vehicles and more.
              </Typography>
            </Box>

            {/* Feature 2 */}

            <Box
              sx={{
                p: 4,

                textAlign: "center",

                border: "1px solid #e5e7eb",

                borderRadius: "16px",

                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 45,
                  mb: 2,
                }}
              >
                💰
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Best Prices
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  color: "#6b7280",
                  lineHeight: 1.6,
                }}
              >
                Get competitive prices with no hidden rental charges.
              </Typography>
            </Box>

            {/* Feature 3 */}

            <Box
              sx={{
                p: 4,

                textAlign: "center",

                border: "1px solid #e5e7eb",

                borderRadius: "16px",

                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 45,
                  mb: 2,
                }}
              >
                🛡️
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Safe & Reliable
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  color: "#6b7280",
                  lineHeight: 1.6,
                }}
              >
                Well-maintained vehicles for a safe and comfortable journey.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
