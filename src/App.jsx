import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import {
  HomePage,
  GenderPage,
  CameraPage,
  AvatarPage,
  OutputPage,
} from "./pages";

export default function App() {
  const [capturedImg, setCapturedImg] = useState();
  const [generatedImg, setGeneratedImg] = useState();
  const [url, setUrl] = useState();
  const [gender, setGender] = useState();
  const [selectedAvatar, setSelectedAvatar] = useState();

  console.log(selectedAvatar);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* home-page */}
        <Route path="/" element={<HomePage setGender={setGender} />} />

        {/* gender page */}
        <Route
          path="/gender"
          element={<GenderPage setGender={setGender} gender={gender} />}
        />

        {/* camera-page */}
        <Route
          path="/camera"
          element={<CameraPage setCapturedImg={setCapturedImg} />}
        />

        {/* avatar-page */}
        <Route
          path="/avatar"
          element={
            <AvatarPage gender={gender} setSelectedAvatar={setSelectedAvatar} />
          }
        />

        {/* output-page */}
        <Route
          path="/output"
          element={
            <OutputPage
              generatedImg={generatedImg}
              url={url}
              setUrl={setUrl}
              setGeneratedImg={setGeneratedImg}
              capturedImg={capturedImg}
              selectedAvatar={selectedAvatar}
            />
          }
        />
      </Routes>

      {!generatedImg && <Footer />}
    </BrowserRouter>
  );
}
