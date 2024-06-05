import "./Stat_Form.css";
import Header from "../components/Header";
import { txtDB } from "./txtConfig";
import { collection, getDocs } from "firebase/firestore";

const colRef = collection(txtDB, "IHM");
const read = () => {
  getDocs(colRef).then((snapshot) => {
    let games = [];
    snapshot.docs.forEach((doc) => {
      games.push({ id: doc.id });
    });
    console.log(games);
  });
};

function Stats() {
  return (
    <div>
      <Header />
      <button
        onClick={(e) => {
          read();
        }}
      >
        Stats
      </button>
    </div>
  );
}

export default Stats;
