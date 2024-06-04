import { BrowserRouter, Route, Routes } from "react-router-dom";
import StatForm from "./pages/Stat_Form";
import About from "./pages/About";
import Stats from "./pages/Stats";
import Media from "./pages/Media";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/stat_form" element={<StatForm />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
