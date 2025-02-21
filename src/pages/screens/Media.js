import Header from "../../components/Header";

import "../css/Account.css";

function Media() {
  return (
    <body className="abg">
      <Header />
      <h1 className="ab">IHM</h1>
      <div className="img-track">
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fsarahzak32%2Fvideos%2F1678779583034580%2F&show_text=false&width=267&t=0"
          width="267"
          height="476"
          scrolling="no"
          style={{ float: "border:none;overflow:hidden" }}
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen="true"
          title="gw"
        ></iframe>
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fsarahzak32%2Fvideos%2F1661735077686269%2F&show_text=false&width=267&t=0"
          width="267"
          height="476"
          style={{ float: "border:none;overflow:hidden" }}
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen="true"
          title="shot"
        ></iframe>
        <img src={require("../imgs/c1.jpeg")} alt="Logo" draggable="false" />
        <img src={require("../imgs/c2.jpeg")} alt="Logo" draggable="false" />
      </div>
      <h1 className="ab">AAU</h1>
      <div className="img-track">
        <img src={require("../imgs/AAU1.jpeg")} alt="Logo" draggable="false" />
        <img src={require("../imgs/AAU2.jpeg")} alt="Logo" draggable="false" />
        <img src={require("../imgs/AAU3.jpeg")} alt="Logo" draggable="false" />
      </div>
    </body>
  );
}

export default Media;
