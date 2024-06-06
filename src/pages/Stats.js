import { useState } from "react";
import "./Stat_Form.css";
import Header from "../components/Header";
import { txtDB } from "./txtConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

function Stats() {
  const [pts, setPts] = useState([]);
  const [wins, setWins] = useState([]);

  async function qC() {
    const colRef = collection(txtDB, "IHM");
    const q = await query(colRef, orderBy("Points", "asc"), limit(5));
    const games = await getDocs(q);
    games.forEach((game) => {
      setPts((p) => [...p, game.data().Points]);
      setWins((w) => [...w, game.data().Win]);
    });
  }

  return (
    <div>
      <Header />
      <button
        onClick={(e) => {
          qC();
        }}
      >
        Stats
      </button>
      <br></br>
      <br></br>
      <ol>
        {pts.map((p) => (
          <li>{p}</li>
        ))}
      </ol>

      <ol>
        {wins.map((w) => (
          <li>{w}</li>
        ))}
      </ol>

      <button
        onClick={(e) => {
          clear();
        }}
      >
        clear
      </button>
    </div>
  );

  function clear() {
    setWins([]);
    setPts([]);
  }
}

export default Stats;
