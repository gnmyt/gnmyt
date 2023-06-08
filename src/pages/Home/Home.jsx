import "./styles.sass";
import {Button} from "@/common/components/Button";
import {faEnvelope, faRocket} from "@fortawesome/free-solid-svg-icons";
import ReactTyped from "react-typed";
import ImageArea from "@/pages/Home/components/ImageArea";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-wrapper">
            <div className="left-area">
                <div className="text-area">
                    <h1>Hi, ich bin <span>GNM</span>.</h1>
                    <h1>Ich <span><ReactTyped strings={["programmiere", "erstelle Konzepte", "bin 17 Jahre alt"]} typeSpeed={120} backSpeed={60}
                                              loop/></span></h1>
                </div>
                <div className="button-area">
                    <Button icon={faRocket} text="Projekte" to="/projects"/>
                    <Button icon={faEnvelope} text="Kontakt" to="/contact"/>
                </div>
            </div>

            <ImageArea />

            <div className="legal-area">
                <p onClick={() => navigate("/privacy")}>Datenschutz</p>
                <p onClick={() => navigate("/imprint")}>Impressum</p>
            </div>

        </div>
    );
}

export default Home;