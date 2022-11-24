import logo from "./logo.svg";
import "./App.css";
import ButtonAppBar from "./components/Navbar";
import PlayersPresent from "./components/Players";
import { Routes, Route } from "react-router-dom";
import AddPlayer from "./components/AddPlayer";
import PlayersControl from "./components/Dashboard";
import ResponsiveAppBar from "./components/Menu";
import Contact from "./components/Contact";
import DetailPresent from "./components/Detail";
import FamousPlayersPresent from "./components/FamousPlayer";
function App() {
  return (
    <div className="App">
      {/* <ButtonAppBar /> */}
      <ResponsiveAppBar />
      {/* <Contact/> */}
      <Routes>
        <Route path="/" element={<PlayersPresent/>}></Route>
        <Route path="/detail/:id" element={<DetailPresent/>}></Route>
        <Route path="/famous-player" element={<FamousPlayersPresent/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/add-player" element={<AddPlayer/>}></Route>
        <Route path="/dashboard" element={<PlayersControl/>}></Route>



      </Routes>
      {/* <AddPlayer/> */}
      {/* <PlayersControl /> */}
    </div>
  );
}

export default App;
