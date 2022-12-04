import "./styles.sass";

export const Contributed = (props) => (
    <div className="contributed-entry">
        <img src={props.icon} alt={props.name} className="contributed-icon"/>
        <a className="contributed-text" href={props.link} target="_blank">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </a>
    </div>
)