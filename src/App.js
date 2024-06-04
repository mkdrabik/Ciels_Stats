import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stat_Form from "./pages/Stat_Form";
import About from "./pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/stat_form" element={<Stat_Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
