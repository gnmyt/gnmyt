import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

export const Button = (props) => (
    <button className="btn btn-primary">
        <Link to={props.to}>
            {props.icon && <FontAwesomeIcon icon={props.icon} className="icon"/>}
            {props.text}
        </Link>
    </button>
);