import "./styles.sass";

export const Planet = ({x, y, onClick, image, name}) => {
    return (
        <div key={name} className="planet" onClick={() => onClick(name)}
             style={{transform: `translate(${x}px, ${y}px)`}}
             title={name}>
            <img src={image} alt={`${name} Logo`}/>
        </div>
    )
}