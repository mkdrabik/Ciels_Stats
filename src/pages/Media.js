import "./css/Account.css";
import Header from "../components/Header";
import "./imgs/c1.jpeg";

function Media() {
  return (
    <body className="abg">
      <Header />
      <h1 className="ab">Pictures/Video</h1>
      <div className="img-track">
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
        <img src={require("./imgs/c1.jpeg")} alt="Logo" draggable="false" />;
      </div>
    </body>
  );
}

export default Media;
