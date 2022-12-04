import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from "@fortawesome/free-solid-svg-icons";

export const Project = (props) => (
    <div className="project-entry">
        <div className="project-text">
            <h2>{props.name} {props.label && <span>{props.label}</span>}</h2>
            <p>{props.description} {props.link && <a href={props.link} target="_blank"><FontAwesomeIcon icon={faExternalLink}/></a>}</p>
        </div>
        <img src={props.icon} alt={props.name} className="project-icon"/>
    </div>
)