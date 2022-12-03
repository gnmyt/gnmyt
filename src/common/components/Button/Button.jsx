import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Button = (props) => (
    <button className="btn btn-primary">
        {props.icon && <FontAwesomeIcon icon={props.icon} className="icon" />}
        {props.text}
    </button>
);