import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
  Paper,
} from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import VerifiedIcon from "@mui/icons-material/Verified";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: "1440px",
        width: "100%",
        mx: "auto",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* =========================================
          HERO SECTION
      ========================================= */}

<Box
  sx={{
    color: "#fff",
    py: {
      xs: 8,
      md: 12,
    },
    backgroundImage: `
      linear-gradient(
        135deg,
        rgba(17, 24, 39, 0.86) 0%,
        rgba(17, 24, 39, 0.72) 100%
      ),
            url("https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <Container maxWidth="lg">
    <Box
      sx={{
        maxWidth: 850,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          display: "inline-block",
          px: 2,
          py: 0.8,
          mb: 2,
          borderRadius: 5,
          backgroundColor: "rgba(255,255,255,0.14)",
          fontSize: "0.9rem",
          fontWeight: 600,
        }}
      >
        ABOUT OUR CAR RENTAL
      </Typography>

      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          fontSize: {
            xs: "2.5rem",
            sm: "3.5rem",
            md: "4.5rem",
          },
          lineHeight: 1.1,
          mb: 3,
        }}
      >
        Your Journey,
        <br />
        Our Cars.
      </Typography>

      <Typography
        sx={{
          maxWidth: 700,
          mx: "auto",
          color: "#e5e7eb",
          fontSize: {
            xs: "1rem",
            md: "1.15rem",
          },
          lineHeight: 1.8,
        }}
      >
        We make car rental simple, reliable, and convenient. Whether you
        are traveling for business, planning a family trip, or simply need
        a car for the day, we have the right vehicle for your journey.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/cars")}
          sx={{
            px: 3,
            py: 1.4,
            borderRadius: 2,
            backgroundColor: "#fff",
            color: "#111827",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#f3f4f6",
            },
          }}
        >
          Explore Our Cars
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{
            px: 3,
            py: 1.4,
            borderRadius: 2,
            borderColor: "#d1d5db",
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": {
              borderColor: "#fff",
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  </Container>
</Box>
      {/* <Box
        sx={{
          background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
          color: "#fff",
          py: {
            xs: 8,
            md: 12,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: 850,
              mx: "auto",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.8,
                mb: 2,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.1)",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              ABOUT OUR CAR RENTAL
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.5rem",
                  md: "4.5rem",
                },
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Your Journey,
              <br />
              Our Cars.
            </Typography>

            <Typography
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: "#d1d5db",
                fontSize: {
                  xs: "1rem",
                  md: "1.15rem",
                },
                lineHeight: 1.8,
              }}
            >
              We make car rental simple, reliable, and convenient. Whether you
              are traveling for business, planning a family trip, or simply need
              a car for the day, we have the right vehicle for your journey.
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/cars")}
                sx={{
                  px: 3,
                  py: 1.4,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  color: "#111827",
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                  },
                }}
              >
                Explore Our Cars
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  px: 3,
                  py: 1.4,
                  borderRadius: 2,
                  borderColor: "#6b7280",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "#fff",
                  },
                }}
              >
                Back to Home
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box> */}


      {/* =========================================
          INTRODUCTION
      ========================================= */}

      <Container maxWidth="lg">
        <Box
          sx={{
            py: {
              xs: 7,
              md: 10,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: {
                xs: 4,
                md: 8,
              },
              alignItems: "center",
            }}
          >
            {/* IMAGE / VISUAL */}

            <Box
              sx={{
                minHeight: {
                  xs: 280,
                  md: 450,
                },
                borderRadius: 4,
                overflow: "hidden",
                background: "linear-gradient(135deg, #e5e7eb, #f9fafb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DirectionsCarIcon
                sx={{
                  fontSize: {
                    xs: 120,
                    md: 200,
                  },
                  color: "#111827",
                }}
              />
            </Box>

            {/* CONTENT */}

            <Box>
              <Typography
                sx={{
                  color: "#6b7280",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  mb: 1,
                }}
              >
                Who We Are
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: "#111827",
                  fontSize: {
                    xs: "2rem",
                    md: "2.8rem",
                  },
                  mb: 3,
                }}
              >
                Making car rental easier for everyone
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.9,
                  mb: 2,
                }}
              >
                Our car rental service is built around one simple idea: renting
                a car should be easy and stress-free. We provide a wide
                selection of quality vehicles for different needs and budgets.
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.9,
                  mb: 3,
                }}
              >
                From compact cars for city travel to spacious vehicles for
                family trips, our goal is to provide dependable cars,
                transparent pricing, and a smooth booking experience.
              </Typography>

              <Button
                variant="contained"
                onClick={() => navigate("/cars")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#111827",
                  px: 3,
                  py: 1.3,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#374151",
                  },
                }}
              >
                Find Your Car
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* =========================================
          STATS
      ========================================= */}

      <Box
        sx={{
          backgroundColor: "#111827",
          color: "#fff",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              // flexWrap:'wrap',
              gridTemplateColumns: {
                xs: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                }}
              >
                40+
              </Typography>

              <Typography sx={{ color: "#d1d5db" }}>Cars Available</Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                }}
              >
                1000+
              </Typography>

              <Typography sx={{ color: "#d1d5db" }}>Happy Customers</Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                }}
              >
                24/7
              </Typography>

              <Typography sx={{ color: "#d1d5db" }}>
                Customer Support
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                }}
              >
                5+
              </Typography>

              <Typography sx={{ color: "#d1d5db" }}>
                Years Experience
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =========================================
          WHY CHOOSE US
      ========================================= */}

      <Container maxWidth="lg">
        <Box
          sx={{
            py: {
              xs: 7,
              md: 10,
            },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              maxWidth: 700,
              mx: "auto",
              mb: 6,
            }}
          >
            <Typography
              sx={{
                color: "#6b7280",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                mb: 1,
              }}
            >
              Why Choose Us
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#111827",
                fontSize: {
                  xs: "2rem",
                  md: "2.8rem",
                },
                mb: 2,
              }}
            >
              Everything you need for a better rental experience
            </Typography>

            <Typography
              sx={{
                color: "#6b7280",
                lineHeight: 1.8,
              }}
            >
              We focus on providing quality vehicles and a simple booking
              experience from start to finish.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {/* CARD 1 */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                height: "100%",
              }}
            >
              <VerifiedIcon
                sx={{
                  fontSize: 42,
                  color: "#111827",
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                Quality Cars
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                Choose from a collection of reliable and well maintained
                vehicles.
              </Typography>
            </Paper>

            {/* CARD 2 */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                height: "100%",
              }}
            >
              <LocalOfferIcon
                sx={{
                  fontSize: 42,
                  color: "#111827",
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                Fair Pricing
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                Transparent daily rental prices with no unnecessary surprises.
              </Typography>
            </Paper>

            {/* CARD 3 */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                height: "100%",
              }}
            >
              <SecurityIcon
                sx={{
                  fontSize: 42,
                  color: "#111827",
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                Secure Booking
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                Your booking information is handled through a secure rental
                process.
              </Typography>
            </Paper>

            {/* CARD 4 */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                height: "100%",
              }}
            >
              <SupportAgentIcon
                sx={{
                  fontSize: 42,
                  color: "#111827",
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                Customer Support
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                Our support team is here to help you with your rental
                experience.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <Box
        sx={{
          backgroundColor: "#fff",
          py: {
            xs: 7,
            md: 10,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
            }}
          >
            <Typography
              sx={{
                color: "#6b7280",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                mb: 1,
              }}
            >
              Simple Process
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#111827",
                fontSize: {
                  xs: "2rem",
                  md: "2.8rem",
                },
              }}
            >
              How it works
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {/* STEP 1 */}

            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 65,
                  height: 65,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "50%",
                  backgroundColor: "#111827",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                }}
              >
                01
              </Box>

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  mb: 1,
                }}
              >
                Choose Your Car
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                Browse our available cars and select the vehicle that suits your
                needs.
              </Typography>
            </Box>

            {/* STEP 2 */}

            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 65,
                  height: 65,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "50%",
                  backgroundColor: "#111827",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                }}
              >
                02
              </Box>

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  mb: 1,
                }}
              >
                Select Your Dates
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                Select your pickup and return dates and check whether the car is
                available.
              </Typography>
            </Box>

            {/* STEP 3 */}

            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 65,
                  height: 65,
                  mx: "auto",
                  mb: 2,
                  borderRadius: "50%",
                  backgroundColor: "#111827",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                }}
              >
                03
              </Box>

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  mb: 1,
                }}
              >
                Complete Your Booking
              </Typography>

              <Typography
                sx={{
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                Enter your information, review your booking, and confirm your
                rental.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =========================================
          MISSION
      ========================================= */}

      <Container maxWidth="md">
        <Box
          sx={{
            py: {
              xs: 7,
              md: 10,
            },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#6b7280",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              mb: 1,
            }}
          >
            Our Mission
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: "#111827",
              fontSize: {
                xs: "2rem",
                md: "2.8rem",
              },
              mb: 3,
            }}
          >
            We want every journey to be a good one.
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              lineHeight: 1.9,
              fontSize: "1.05rem",
            }}
          >
            Our mission is to make transportation easier by connecting customers
            with dependable vehicles through a simple and convenient rental
            platform. We believe that getting a car should be as easy as
            choosing your destination.
          </Typography>
        </Box>
      </Container>

      {/* =========================================
          CTA
      ========================================= */}

      <Box
        sx={{
          py: {
            xs: 7,
            md: 9,
          },
          backgroundColor: "#111827",
          color: "#fff",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
                mb: 2,
              }}
            >
              Ready to hit the road?
            </Typography>

            <Typography
              sx={{
                color: "#d1d5db",
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              Find the perfect car for your next journey and start your booking
              today.
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/cars")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: "#fff",
                color: "#111827",
                textTransform: "none",
                fontWeight: 800,
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                },
              }}
            >
              Browse Cars
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default About;
