import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";

export const ContactCard = (props) => (
    <a className="contact-card" href={props.link} target="_blank">
        <div className="contact-text">
            <FontAwesomeIcon icon={props.icon} />
            <h3>{props.text}</h3>
        </div>
        <FontAwesomeIcon icon={faCaretRight} className="icon-right" />
    </a>
)