import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { mainHomeImage } from "../../common/imagesContant";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Hello, welcome to Chatdy</h1>
      <h3>Let's connect with your friends</h3>
      <img src={mainHomeImage} alt="main-home-image" width="300"/>

      <div>
        <ArrowRight />
        Go to
        <Link to={"/chat"}>
          <span style={{ fontWeight: "bold" }}> CHAT</span>
        </Link>
      </div>
    </div>
  );
}
