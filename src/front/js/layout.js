import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

import LoginForm  from "./pages/LoginForm.jsx";
import RegisterForm  from "./pages/RegisterForm.jsx";
import ForgotPasswordForm from "./pages/ForgotPasswordForm.jsx";
import { Category } from "./pages/Category.jsx";
import TattooerProfile from "./pages/TattooerProfile.jsx";
import injectContext from "./store/appContext";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component

const ContentWrapper = () => {
    const location = useLocation();
    const hideNavbarPaths = ['/login', '/register', '/login/forgotpass'];
  
    // esto es para saber donde mostrar el navbar
    const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  
    return (
      <>
        {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Demo />} path="/demo" />
          <Route element={<Single />} path="/single/:theid" />
          <Route element={<LoginForm />} path="/login" />
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<ForgotPasswordForm />} path="/login/forgotpass" />
          <Route element={<Category />} path="/category/:categoryName" />
          <Route element={<TattooerProfile />} path="/tattooer/:id" />
          <Route element={<h1>Not found!</h1>} path="*" /> 
        </Routes>
      </>
    );
  };
  
  const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
  
    return (

      <div className="h-100">
      <BrowserRouter>
        <ScrollToTop>
          <ContentWrapper />
          {/* <Footer /> */}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

  
  export default injectContext(Layout);