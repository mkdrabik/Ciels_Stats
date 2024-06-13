import "./css/About.css";
import Header from "../components/Header";

function About() {
  return (
    <body className="bg2">
      <Header />
      <h1 className="ab1">About: </h1>
      <div className="hori">
        <h1 className="ab1">Height:</h1>
        <h1 className="ab"> 5'6"</h1>
      </div>

      <div className="hori">
        <h1 className="ab1">Position: </h1>
        <h1 className="ab"> PG/SG</h1>
      </div>
      <div className="hori">
        <h1 className="ab1">AAU Team: </h1>
        <h1 className="ab"> NC Steelers</h1>
      </div>
      <div className="hori">
        <h1 className="ab1">School: </h1>
        <h1 className="ab"> Immaculate Heart of Mary</h1>
      </div>
      <div className="hori">
        <h1 className="ab1">GPA: </h1>
        <h1 className="ab"> 4.0</h1>
      </div>
      <div className="hori">
        <h1 className="ab1"> Playstyle: </h1>
        <h1 className="ab">
          {" "}
          Team first player who is constantly trying to get teamates involved.
          Scoring comes from slashing and 3pt shooting. Teacious defender who is
          constantly picking the pocket of her opponents and chasing after ever
          loose ball.
        </h1>
      </div>
    </body>
  );
}

export default About;
