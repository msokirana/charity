import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ThemeRoutes from "./routes/ThemeRoutes";
import Starter from "./views/Starter";
import AddCampaign from "./views/AddCampaign";
import FullLayout from "./layouts/FullLayout";
import Users from "./views/Users";
import ForgotPassword from "./views/ForgotPassword";
import { GoogleOAuthProvider } from '@react-oauth/google';
import CaseDetails from "./views/case/CaseDetails";
import NewPasswordCard from "./views/NewPasswordCard";
import MyFunds from "./views/MyFunds";

const App = () => {
  const { isAuthenticated } = useAuth(); // Use your authentication context or hook
  console.log("isAuthenticated", isAuthenticated)
  return (
    <GoogleOAuthProvider clientId="910266827305-329en2ft24q44dqm2pvpsdetcbajs14p.apps.googleusercontent.com">
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route  path="/login" element={<Login />} />
          <Route  path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/" element={<FullLayout Component={Starter} />} />
          <Route exact path="/my-fund" element={<FullLayout Component={MyFunds} />} />

          {/* Private routes */}
          <Route  path="/starter/request" element={<FullLayout Component={Starter} />}  /> {/* Corrected Route element usage */}
          <Route  path="/add-campaign" element={<FullLayout Component={AddCampaign} />} />
          <Route   path="/users" element={<FullLayout Component={Users} />}  /> {/* Corrected Route element usage */}
          <Route  path="/case-details" element={<FullLayout Component={CaseDetails} />}  />
          <Route  path="/user/reset-password/:token" element={<NewPasswordCard />}  />
         
          
        </Routes>
      </AuthProvider>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default App;

