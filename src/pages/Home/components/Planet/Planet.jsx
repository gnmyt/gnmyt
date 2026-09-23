import "./styles.sass";
import {motion} from "framer-motion";

export const Planet = ({x, y, onClick, onGrab, logo, name}) => {
    return (
        <motion.div
            key={name}
            className="planet"
            onClick={() => onClick(name)}
            onPointerDown={event => { event.preventDefault(); onGrab(name, event); }}
            style={{transform: `translate(${x}px, ${y}px)`}}
            title={name}>
            <img src={logo} alt={`${name} Logo`} draggable={false}/>
        </motion.div>
    )
}
