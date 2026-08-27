import { useEffect, useState } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { Box, CircularProgress, Typography } from "@mui/material";

import { auth, db } from "../lib/Firebase";

function AdminRoute() {
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // =========================================
      // USER IS NOT LOGGED IN
      // =========================================

      if (!currentUser) {
        setIsAdmin(false);
        setLoading(false);

        return;
      }

      try {
        // =========================================
        // GET USER DOCUMENT
        // =========================================

        const userRef = doc(db, "users", currentUser.uid);

        const userSnapshot = await getDoc(userRef);

        // =========================================
        // USER DOCUMENT NOT FOUND
        // =========================================

        if (!userSnapshot.exists()) {
          setIsAdmin(false);
          setLoading(false);

          return;
        }

        // =========================================
        // GET USER DATA
        // =========================================

        const userData = userSnapshot.data();

        // =========================================
        // CHECK ADMIN
        // =========================================

        if (userData.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Admin role error:", error);

        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          gap: 2,
        }}
      >
        <CircularProgress />

        <Typography>Checking admin access...</Typography>
      </Box>
    );
  }

  // =========================================
  // NOT ADMIN
  // =========================================

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // =========================================
  // ADMIN
  // =========================================

  return <Outlet />;
}

export default AdminRoute;
