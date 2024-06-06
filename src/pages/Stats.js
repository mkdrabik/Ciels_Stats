import { useState, useEffect } from "react";
import "./Stat_Form.css";
import "./Stats.css";
import Header from "../components/Header";
import { txtDB, auth } from "./txtConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

function Stats() {
  const [games, setGames] = useState(() => {
    const lv = localStorage.getItem("GAMES");
    if (lv == null) return [];
    return JSON.parse(lv);
  });

  useEffect(() => {
    localStorage.setItem("GAMES", JSON.stringify(games));
  }, [games]);

  async function qC() {
    if (games.length === 0) {
      try {
        if (auth.currentUser != null) {
          const colRef = collection(txtDB, "IHM");
          const q = await query(colRef, orderBy("Points", "asc"), limit(2));
          const data = await getDocs(q);
          data.forEach((g) => {
            const game = {
              opponent: g.data().Opponent,
              points: g.data().Points,
              win: g.data().Win,
            };
            setGames((ga) => [...ga, game]);
          });
        } else {
          alert("Provide Gmail to view stats");
        }
      } catch (err) {
        if (
          err ===
          "FirebaseError: [code=permission-denied]: Missing or insufficient permissions."
        ) {
          alert("Provide Gmail to view stats");
        } else {
          alert("Idk what happened lmao");
          console.log(err);
        }
      }
    } else {
      alert("Up to date");
    }
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
      <button
        onClick={(e) => {
          clear();
        }}
      >
        clear
      </button>
      <br></br>
      <div className="app-container">
        <table>
          <thead>
            <tr>
              <th>Points</th>
              <th>Opponent</th>
              <th>Win</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g) => (
              <tr>
                <td>{g.points}</td>
                <td>{g.opponent}</td>
                <td>{g.win}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function clear() {
    localStorage.setItem("GAMES", []);
    setGames([]);
  }
}

export default Stats;
