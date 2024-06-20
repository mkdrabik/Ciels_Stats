import "./css/About.css";
import "./imgs/c1.jpeg";
import Header from "../components/Header";

function About() {
  return (
    <body className="abg">
      <Header />
      <br />
      <br />
      <div className="ab-hori">
        <h1 className="ab-t">Height:</h1>
        <h1 className="ab-des"> 5'6"</h1>
      </div>

      <div className="ab-hori">
        <h1 className="ab-t">Position: </h1>
        <h1 className="ab-des"> PG/SG</h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-t">AAU Team: </h1>
        <h1 className="ab-des"> NC Steelers</h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-t">School: </h1>
        <h1 className="ab-des"> Immaculate Heart of Mary</h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-t">Hometown: </h1>
        <h1 className="ab-des"> High Point, NC</h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-t">GPA: </h1>
        <h1 className="ab-des"> 4.0</h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-t"> Playstyle: </h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-des">
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
