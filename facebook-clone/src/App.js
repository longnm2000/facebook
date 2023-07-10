import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
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
      </Routes>
    </div>
  );
}

export default App;
