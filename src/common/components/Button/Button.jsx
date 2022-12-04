import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

export const Button = (props) => {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(props.to, {replace: true}), [navigate]);

    return (
        <button className="btn btn-primary" onClick={handleOnClick}>
            {props.icon && <FontAwesomeIcon icon={props.icon} className="icon"/>}
            {props.text}
        </button>
    );
}