import { BrowserRouter, Route, Routes } from "react-router-dom";

import StatForm from "./pages/screens/Stat_Form";
import About from "./pages/screens/About";
import Stats from "./pages/screens/Stats";
import Media from "./pages/screens/Media";
import Account from "./pages/screens/Account";
import SignUp from "./pages/screens/Signup";

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
          <Route path="/account" element={<Account />} />
          <Route path="/su" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
