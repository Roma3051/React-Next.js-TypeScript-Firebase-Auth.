import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import PrivateRoute from "../routing/ProtectedRoute";

const Home: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      router.push("/login"); 
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <PrivateRoute>
      <div>
        <h1>Welcome to Home Page</h1>
        <Button onClick={handleLogout} variant="contained" color="primary">
          Log Out
        </Button>
      </div>
    </PrivateRoute>
  );
};

export default Home;
