import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../lib/Firebase";


// =========================
// CREATE CONTEXT
// =========================

const UserContext = createContext(null);


// =========================
// USER PROVIDER
// =========================

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] =
    useState(null);

  const [userData, setUserData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          // =========================
          // USER NOT LOGGED IN
          // =========================

          if (!user) {
            setCurrentUser(null);

            setUserData(null);

            setLoading(false);

            return;
          }


          // =========================
          // USER LOGGED IN
          // =========================

          setCurrentUser(user);

          try {
            const userRef = doc(
              db,
              "users",
              user.uid
            );

            const userSnapshot =
              await getDoc(userRef);

            if (userSnapshot.exists()) {
              setUserData(
                userSnapshot.data()
              );
            } else {
              setUserData({
                name: "",
                email: user.email,
              });
            }
          } catch (error) {
            console.error(
              "Error getting user data:",
              error
            );

            setUserData({
              name: "",
              email: user.email,
            });
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);


  return (
    <UserContext.Provider
      value={{
        currentUser,

        userData,

        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


// =========================
// CUSTOM HOOK
// =========================

export const useUser = () => {
  return useContext(UserContext);
};