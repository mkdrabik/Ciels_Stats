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

  //every time games changes local storage is updated
  useEffect(() => {
    localStorage.setItem("GAMES", JSON.stringify(games));
  }, [games]);

  //gets games ordered by points; more queries to come
  async function qC() {
    if (games.length === 0) {
      try {
        if (auth.currentUser != null) {
          const colRef = collection(txtDB, "IHM");
          const q = await query(colRef, orderBy("Points", "asc"), limit(2));
          const data = await getDocs(q);
          data.forEach((g) => {
            const game = {
              points: g.data().Points,
              rebounds: g.data().Rebounds,
              assists: g.data().Assists,
              steals: g.data().Steals,
              blocks: g.data().Blocks,
              fouls: g.data().Fouls,
              win: g.data().Win,
              opponent: g.data().Opponent,
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
              <th>Rebounds</th>
              <th>Assists</th>
              <th>Steals</th>
              <th>Blocks</th>
              <th>Fouls</th>
              <th>Win</th>
              <th>Opponent</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g) => (
              <tr>
                <td>{g.points}</td>
                <td>{g.rebounds}</td>
                <td>{g.assists}</td>
                <td>{g.steals}</td>
                <td>{g.blocks}</td>
                <td>{g.fouls}</td>
                <td>{g.opponent}</td>
                <td>{g.win}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  //resets local storage and games array
  function clear() {
    localStorage.setItem("GAMES", []);
    setGames([]);
  }
}

export default Stats;
