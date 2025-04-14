import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Single } from "./pages/single";

import LoginForm from "./pages/LoginForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import ForgotPasswordForm from "./pages/ForgotPasswordForm.jsx";
import { Category } from "./pages/Category.jsx";
import TattooerProfile from "./pages/TattooerProfile.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import Footer from './component/Footer.jsx';
import { Notifications } from "./component/Notifications.js";
import AboutUs from "./pages/AboutUs.js";
import TermsAndConditions from "./pages/TermsAndConditions.js";

// Página de Notificaciones (mock)
export const NotificationsPage = () => {
  return <Notifications />;
};

const hideUIPaths = ['/login', '/register', '/login/forgotpass'];

const ContentWrapper = () => {
  const location = useLocation();
  const shouldShowUI = !hideUIPaths.includes(location.pathname);

  return (
    <>
      {shouldShowUI && <Navbar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route element={<Home />} path="/" />

          <Route element={<LoginForm />} path="/login" />
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<ForgotPasswordForm />} path="/login/forgotpass" />
          <Route element={<Category />} path="/category/:categoryName" />
          <Route element={<TattooerProfile />} path="/tattooer/:id" />
          <Route element={<Notifications />} path="/notifications" />
          <Route element={<h1>Not found!</h1>} path="*" />
          <Route element={<AboutUs />} path="/about" />
          <Route element={<TermsAndConditions />} path="/terms-and-conditions" />
        </Routes>
      </div>
      {shouldShowUI && <Footer />}
    </>
  );
};

const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <BrowserRouter>
        <ScrollToTop>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <ContentWrapper />
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
