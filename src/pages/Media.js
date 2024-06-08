import "./Stat_Form.css";
import Header from "../components/Header";

function Media() {
  return (
    <div>
      <Header />
      <h1>Pictures/Video</h1>
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
      <img src={require("./c1.jpeg")} alt="Logo" />;
    </div>
  );
}

export default Media;
