import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export const BackCard = (props) => (
    <div className="back-card">
        <button className="back-button">
            <FontAwesomeIcon icon={faChevronLeft} className="icon" />
        </button>
        <h3 className="current-page">{props.currentPage}</h3>
    </div>
);