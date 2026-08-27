import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";

import { signOut } from "firebase/auth";

import { auth } from "../lib/Firebase";

function Navbar() {
  const navigate = useNavigate();

  const { currentUser, userData } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  // =========================
  // USER MENU
  // =========================

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      await signOut(auth);

      handleCloseUserMenu();

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // =========================
  // CLOSE DRAWER
  // =========================

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",

          color: "#111827",

          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,

              display: "flex",

              justifyContent: "space-between",
            }}
          >
            {/* =========================
                LOGO
            ========================= */}

            <Typography
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",

                color: "#111827",

                fontSize: "1.5rem",

                fontWeight: 800,
              }}
            >
              CarRent
            </Typography>

            {/* =========================
                DESKTOP NAVIGATION
            ========================= */}

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "#111827",

                  textTransform: "none",

                  fontWeight: 600,
                }}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/cars"
                sx={{
                  color: "#111827",

                  textTransform: "none",

                  fontWeight: 600,
                }}
              >
                Cars
              </Button>

              <Button
                component={Link}
                to="/about"
                sx={{
                  color: "#111827",

                  textTransform: "none",

                  fontWeight: 600,
                }}
              >
                About
              </Button>

              {userData?.role === "admin" && (
                <Button
                component ={Link}
                to='/admin'
                  sx={{
                    color: "#111827",

                  textTransform: "none",

                  fontWeight: 600,
                  }}
                >
                  Admin Dashboard
                </Button>
              )}
            </Stack>

            {/* =========================
                RIGHT SIDE
            ========================= */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },

                alignItems: "center",

                gap: 1,
              }}
            >
              {/* =========================
                  NOT LOGGED IN
              ========================= */}

              {!currentUser && (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={<LoginIcon />}
                    sx={{
                      color: "#111827",

                      textTransform: "none",

                      fontWeight: 700,
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    sx={{
                      backgroundColor: "#111827",

                      textTransform: "none",

                      fontWeight: 700,

                      borderRadius: "9px",

                      "&:hover": {
                        backgroundColor: "#374151",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {/* =========================
                  LOGGED IN
              ========================= */}

              {currentUser && (
                <>
                  <Button
                    onClick={handleUserMenu}
                    startIcon={<AccountCircleIcon />}
                    sx={{
                      color: "#111827",

                      textTransform: "none",

                      fontWeight: 700,

                      textAlign: "left",
                    }}
                  >
                    {userData?.name || currentUser.email}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseUserMenu}
                    slotProps={{
                      paper: {
                        sx: {
                          mt: 1,

                          minWidth: 240,

                          borderRadius: "12px",
                        },
                      },
                    }}
                  >
                    {/* NAME */}

                    <Box
                      sx={{
                        px: 2,

                        py: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,

                          color: "#111827",
                        }}
                      >
                        {userData?.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",

                          wordBreak: "break-word",

                          mt: 0.3,
                        }}
                      >
                        {userData?.email || currentUser.email}
                      </Typography>
                    </Box>

                    <Divider />

                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();

                        navigate("/my-bookings");
                      }}
                    >
                      My Bookings
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </Box>

            {/* =========================
                MOBILE MENU BUTTON
            ========================= */}

            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },

                color: "#111827",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* =========================
          MOBILE DRAWER
      ========================= */}

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box
          sx={{
            width: 280,

            height: "100%",

            display: "flex",

            flexDirection: "column",
          }}
        >
          {/* USER INFORMATION */}

          {currentUser && (
            <>
              <Box
                sx={{
                  p: 3,

                  backgroundColor: "#f8fafc",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,

                    color: "#111827",
                  }}
                >
                  {userData?.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,

                    color: "#6b7280",

                    wordBreak: "break-word",
                  }}
                >
                  {userData?.email || currentUser.email}
                </Typography>
              </Box>

              <Divider />
            </>
          )}

          {/* NAVIGATION */}

          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={closeDrawer}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/cars" onClick={closeDrawer}>
                <ListItemText primary="Cars" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/about"
                onClick={closeDrawer}
              >
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            {userData && (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin"
                  onClick={closeDrawer}
                >
                  <ListItemText primary="Admin Dashboard" />
                </ListItemButton>
              </ListItem>
            )}

            {currentUser && (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/my-bookings"
                  onClick={closeDrawer}
                >
                  <ListItemText primary="My Bookings" />
                </ListItemButton>
              </ListItem>
            )}
          </List>

          <Box
            sx={{
              // mt: "auto",

              p: 2,
            }}
          >
            {/* NOT LOGGED IN */}

            {!currentUser && (
              <Stack spacing={1.5}>
                <Button
                  fullWidth
                  component={Link}
                  to="/login"
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  onClick={closeDrawer}
                  sx={{
                    textTransform: "none",

                    fontWeight: 700,

                    borderRadius: "9px",
                  }}
                >
                  Login
                </Button>

                <Button
                  fullWidth
                  component={Link}
                  to="/signup"
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={closeDrawer}
                  sx={{
                    backgroundColor: "#111827",

                    textTransform: "none",

                    fontWeight: 700,

                    borderRadius: "9px",

                    "&:hover": {
                      backgroundColor: "#374151",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            )}

            {/* LOGGED IN */}

            {currentUser && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleLogout();

                  closeDrawer();
                }}
                sx={{
                  backgroundColor: "#111827",

                  textTransform: "none",

                  fontWeight: 700,

                  borderRadius: "9px",

                  "&:hover": {
                    backgroundColor: "#374151",
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
