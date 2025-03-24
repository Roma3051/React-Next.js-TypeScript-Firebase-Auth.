import React from "react";
import AuthForm from "../components/AuthForm"; 

const HomePage = () => {
  return (
    <div>
      <AuthForm isRegister={false} /> 
    </div>
  );
};

export default HomePage;
