import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Main from "./components/nav/Main";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";

import Dashboard from "./pages/user/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        <Main />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/auth/account-activate/:token"
            element={<AccountActivate />}
          ></Route>
          <Route
            path="/auth/forgot-password"
            element={<ForgotPassword />}
          ></Route>
          <Route
            path="/auth/access-account/:token"
            element={<AccessAccount />}
          ></Route>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
