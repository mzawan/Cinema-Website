// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./component/TopBar";
import Sidebar from "./component/Sidebar";
import Footer from "./component/Footer";
import MainContainer from "./component/MainContainer";
import Login from "./component/Login";
import Register from "./component/Register";
import "./App.css";

// Optional Auth Context
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [category, setCategory] = useState(null);
  const [language, setLanguage] = useState("en");

  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <div>
                  <TopBar />
                  <section className="main-container">
                    <Sidebar setCategory={setCategory} setTimeOfDay={setTimeOfDay} setLanguage={setLanguage} />
                    <MainContainer timeOfDay={timeOfDay} category={category} language={language} />
                  </section>
                  <Footer />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
