import "./css/About.css";
import "./imgs/c1.jpeg";
import Header from "../components/Header";

function About() {
  return (
    <body>
      <Header />
      <br />
      <br />
      <div className="hori">
        <h1 className="ab1">Height:</h1>
        <h1 className="ab2"> 5'6"</h1>
      </div>

      <div className="hori">
        <h1 className="ab1">Position: </h1>
        <h1 className="ab2"> PG/SG</h1>
      </div>
      <div className="hori">
        <h1 className="ab1">AAU Team: </h1>
        <h1 className="ab2"> NC Steelers</h1>
      </div>
      <div className="hori">
        <h1 className="ab1">School: </h1>
        <h1 className="ab2"> Immaculate Heart of Mary</h1>
      </div>
      <div className="hori">
        <h1 className="ab1">Hometown: </h1>
        <h1 className="ab2"> High Point, NC</h1>
      </div>
      <div className="hori">
        <h1 className="ab1">GPA: </h1>
        <h1 className="ab2"> 4.0</h1>
      </div>
      <div className="hori">
        <h1 className="ab1"> Playstyle: </h1>
        <h1 className="ab2">
          {" "}
          Team first player who is constantly trying to get teamates involved.
          Most of her scoring comes from slashing and 3pt shooting. She is a
          tenacious defender who is constantly picking the pocket of her
          opponents and chasing after every loose ball.
        </h1>
      </div>
    </body>
  );
}

export default About;
