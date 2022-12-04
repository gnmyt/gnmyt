import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export const BackCard = (props) => (
    <div className="back-card">
        <Link to="/">
            <button className="back-button">
                <FontAwesomeIcon icon={faChevronLeft} className="icon" />
            </button>
        </Link>
        <h3 className="current-page">{props.currentPage}</h3>
    </div>
);