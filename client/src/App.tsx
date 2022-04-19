import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Layouts/Header/Header";
import Navigation from "./Layouts/Navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path={"/"} element={<></>} />
        <Route path={"*"} element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
