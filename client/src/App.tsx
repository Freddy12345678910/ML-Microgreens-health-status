import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Layouts/Header/Header";
import Navigation from "./Layouts/Navigation/Navigation";

import Home from "./Pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"*"} element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
