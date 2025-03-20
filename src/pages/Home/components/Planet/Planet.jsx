import "./styles.sass";

export const Planet = ({x, y, onClick, logo, name}) => {
    return (
        <div key={name} className="planet" onClick={() => onClick(name)}
             style={{transform: `translate(${x}px, ${y}px)`}}
             title={name}>
            <img src={logo} alt={`${name} Logo`}/>
        </div>
    )
}