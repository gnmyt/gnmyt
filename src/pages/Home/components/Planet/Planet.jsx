import "./styles.sass";

export const Planet = ({id, x, y, onClick}) => {
    return (
        <div key={id} className="planet" onClick={() => onClick(id)}
             style={{transform: `translate(${x}px, ${y}px)`}}>
            <img src="https://place-hold.it/500x500.png" alt="Planet Logo"/>
        </div>
    )
}