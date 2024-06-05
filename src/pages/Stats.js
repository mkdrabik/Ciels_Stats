import "./Stat_Form.css";
import Header from "../components/Header";
import { txtDB } from "./txtConfig";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

async function qC() {
  const colRef = collection(txtDB, "IHM");
  const q = await query(colRef, orderBy("Assists", "asc"), limit(5));

  const games = await getDocs(q);
  games.forEach((user) => {
    console.log(user.data());
  });
}

function Stats() {
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
    </div>
  );
}

export default Stats;
