import { useState, useEffect, useRef } from "react";
import { txtDB, auth } from "../txtConfig";
import {
  average,
  collection,
  getAggregateFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import Header from "../../components/Header";

import "../css/Stats.css";

function Stats() {
  const [games, setGames] = useState(() => {
    const lv = localStorage.getItem("GAMES");
    if (lv == null) return [];
    return JSON.parse(lv);
  });

  const [avgs, setAVGs] = useState(() => {
    const lv = localStorage.getItem("AVGS");
    if (lv == null) return {};
    return JSON.parse(lv);
  });

  const [showSB, setSB] = useState(true);
  const [season, setSeason] = useState("");
  const [filter, setFilter] = useState("");
  const [number, setNumber] = useState(0);
  const [order, setOrder] = useState("desc");
  const [opponent, setOpponent] = useState("");
  const [useOpp, setUseOpp] = useState(false);
  const n = useRef("");
  const se = useRef("");
  const fil = useRef("");
  const o = useRef("");
  const opp = useRef("");

  //every time games changes local storage is updated
  useEffect(() => {
    localStorage.setItem("GAMES", JSON.stringify(games));
  }, [games]);

  //when filter changes if user is using opponent variable changes
  //else opponent input is not seen
  useEffect(() => {
    if (filter === "Opponent") {
      setUseOpp(true);
    } else {
      setUseOpp(false);
    }
  }, [filter]);

  //stores averages in local storage everytime avgs changes
  useEffect(() => {
    localStorage.setItem("AVGS", JSON.stringify(avgs));
  }, [avgs]);

  //gets games ordered based on filter choice;
  async function qC() {
    try {
      setGames([]);
      setAVGs({});
      if (auth.currentUser != null) {
        const colRef = collection(txtDB, season);
        var q = null;
        if (useOpp) {
          //opponent query
          q = await query(
            colRef,
            where("Opponent", "==", opponent),
            limit(Number(number))
          );
          if (q.converter === null) {
            alert("Invalid Opponent");
          }
        } else {
          //non-opponent query
          q = await query(
            colRef,
            orderBy(filter, order),
            limit(Number(number))
          );
        }

        //gets averages over query
        const ss = await getAggregateFromServer(q, {
          ppg: average("Points"),
          rpg: average("Rebounds"),
          apg: average("Assists"),
          spg: average("Steals"),
          fpg: average("Fouls"),
        });

        const data = await getDocs(q);
        data.forEach((g) => {
          const game = {
            points: g.data().Points,
            rebounds: g.data().Rebounds,
            assists: g.data().Assists,
            steals: g.data().Steals,
            fouls: g.data().Fouls,
            win: g.data().Win,
            opponent: g.data().Opponent,
          };

          setGames((ga) => [...ga, game]);
          setAVGs({
            points: Math.round(ss.data().ppg * 10) / 10,
            rebounds: Math.round(ss.data().rpg * 10) / 10,
            assists: Math.round(ss.data().apg * 10) / 10,
            steals: Math.round(ss.data().spg * 10) / 10,
            fouls: Math.round(ss.data().fpg * 10) / 10,
          });
          setSB(false);
        });
      } else {
        alert("Provide Gmail to view stats");
      }
    } catch (err) {
      if (err.toString().includes(" Missing or insufficient permissions")) {
        alert("Provide Gmail to view stats");
      } else {
        alert(err);
        console.log(err);
      }
    }
  }

  return (
    <body className="statsbg">
      <>
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
            <option value="Date">Date</option>
            <option value="Opponent">Opponent</option>
          </select>
          {!useOpp && (
            <select
              required
              name="order"
              id="order"
              placeholder=""
              onChange={handleOrderChange}
              ref={o}
            >
              <option value="">Order By</option>
              <option value="desc">Highest/Recent</option>
              <option value="asc">Lowest/Farthest</option>
            </select>
          )}
          {useOpp && (
            <input
              placeholder="Team Name"
              className="stats-ib"
              type="text"
              ref={opp}
              onChange={handleOppChange}
            />
          )}
          <input
            placeholder="# of Games"
            className="stats-ib"
            type="number"
            ref={n}
            onChange={handleNumChange}
          />
        </div>
        <div className="row-container">
          {showSB && (
            <button className="stats-btn" onClick={filled}>
              Get Stats
            </button>
          )}

          <button className="stats-btn" onClick={clear}>
            Clear Data
          </button>

          <button className="stats-btn" onClick={cf}>
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

                <th>Fouls</th>

                <th>Opponent</th>
                <th>W/L</th>
              </tr>
            </thead>
            <tbody>
              {games.map((g) => (
                <tr>
                  <td>{g.points}</td>
                  <td>{g.rebounds}</td>
                  <td>{g.assists}</td>
                  <td>{g.steals}</td>
                  <td>{g.fouls}</td>
                  <td>{g.opponent}</td>
                  <td>{g.win}</td>
                </tr>
              ))}
              <tr>
                <th>Avgs</th>
              </tr>
              <tr>
                <td>{avgs.points}</td>
                <td>{avgs.rebounds}</td>
                <td>{avgs.assists}</td>
                <td>{avgs.steals}</td>
                <td>{avgs.fouls}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
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

  function handleOppChange(e) {
    setOpponent(e.target.value);
    setSB(true);
  }

  function handleOrderChange() {
    var e = document.getElementById("order");
    var value = e.options[e.selectedIndex].value;
    setOrder(value);
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
    setAVGs({});
  }

  //clears the inputs
  function cf() {
    se.current.value = "";
    n.current.value = "";
    fil.current.value = "";
    if (!useOpp) {
      o.current.value = "";
    } else {
      opp.current.value = "";
    }
    setSeason("");
    setFilter("");
    setNumber(0);
    setOrder("");
    setOpponent("");
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
