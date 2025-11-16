import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Announcements from "./pages/Announcements.jsx";
import Gallery from "./pages/Gallery.jsx";
import Team from "./pages/Team.jsx";
import Registration from "./auth/Registration.jsx";
import MedicalRegisteration from "./auth/MedicalRegisteration.jsx";
import OthersRegisteration from "./auth/OthersRegisteration.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import theme from "./theme/index.js";

import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/team" element={<Team />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/register" element={<Registration />} />
            <Route path="/register/medical" element={<MedicalRegisteration />} />
            <Route path="/register/others" element={<OthersRegisteration />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
