import { useState, useEffect, useRef } from "react";
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
  const [showSB, setSB] = useState(true);
  const [season, setSeason] = useState("");
  const [filter, setFilter] = useState("");
  const [number, setNumber] = useState(0);
  const n = useRef("");
  const se = useRef("");
  const fil = useRef("");
  //every time games changes local storage is updated
  useEffect(() => {
    localStorage.setItem("GAMES", JSON.stringify(games));
  }, [games]);

  //gets games ordered by points; more queries to come
  async function qC() {
    try {
      clear();
      if (auth.currentUser != null) {
        const colRef = collection(txtDB, season);
        const q = await query(colRef, orderBy(filter, "asc"), limit(Number(2)));
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
          setSB(false);
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
      }
    }
  }

  return (
    <body className="body2">
      <Header />
      <br></br>
      <div className="row-container">
        <select
          required
          name="season"
          id="season"
          placeholder=""
          onChange={handleSeasonChange}
          ref={se}
        >
          <option value="">Which Season</option>
          <option value="AAU">AAU</option>
          <option value="IHM">IHM</option>
        </select>
        <select
          required
          name="filter"
          id="filter"
          placeholder=""
          onChange={handleFilterChange}
          ref={fil}
        >
          <option value="">Filter By</option>
          <option value="Points">Points</option>
          <option value="Win">Win</option>
          <option value="Opponent">Opponent</option>
        </select>
        <input
          placeholder="# of Games"
          className="input-box"
          type="number"
          ref={n}
          onChange={handleNumChange}
        />
        <div>
          {showSB && (
            <button
              className="button2"
              onClick={(e) => {
                filled();
              }}
            >
              Get Stats
            </button>
          )}
        </div>
        <br></br>
        <br></br>
        <button
          className="button2"
          onClick={(e) => {
            clear();
          }}
        >
          Clear Data
        </button>

        <button
          className="button2"
          onClick={(e) => {
            cf();
          }}
        >
          Clear Form
        </button>
      </div>
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
    </body>
  );

  //handles changes of pickers
  function handleSeasonChange() {
    var e = document.getElementById("season");
    var value = e.options[e.selectedIndex].value;
    setSeason(value);
    setSB(true);
  }

  function handleFilterChange() {
    var e = document.getElementById("filter");
    var value = e.options[e.selectedIndex].value;
    setFilter(value);
    setSB(true);
  }

  function handleNumChange(e) {
    if (e.target.value >= 0) {
      setNumber(e.target.value);
      setSB(true);
    } else {
      e.target.value = 0;
    }
  }

  //resets local storage and games array
  function clear() {
    setSeason("");
    setGames([]);
  }

  function cf() {
    se.current.value = "";
    n.current.value = "";
    fil.current.value = "";
    setSeason("");
    setFilter("");
    setNumber(0);
  }

  //checks to make sure fields are filled out properly
  function filled() {
    if (season === "" || filter === "" || Number(number) <= 0) {
      alert("Fill everything out");
    } else {
      qC();
    }
  }
}

export default Stats;
