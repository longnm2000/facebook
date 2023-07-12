import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Helmet } from "react-helmet";
import AdminLoginPage from "./pages/Auth/AuthLoginPage/AdminLoginPage";
import AdminHomePage from "./pages/Auth/AuthHomePage/AdminHomePage";
import AuthPostPage from "./pages/Auth/AuthPostPage/AuthPostPage";

function App() {
  return (
    <div className="App">
      <Helmet>
        <link
          rel="icon"
          href="https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico"
        />
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            !!localStorage.getItem("currentUser") ? (
              <HomePage />
            ) : (
              <Navigate to="/login-user" />
            )
          }
        ></Route>
        <Route path="/login-user" element={<LoginPage />}></Route>
        <Route path="/profile/:id" element={<ProfilePage />}></Route>
        <Route path="/admin/users" element={<AdminHomePage />}></Route>
        <Route path="/admin/login-admin" element={<AdminLoginPage />}></Route>
        <Route path="/admin/posts" element={<AuthPostPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
