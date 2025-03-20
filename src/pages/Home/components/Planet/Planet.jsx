import "./styles.sass";
import {motion} from "framer-motion";

export const Planet = ({x, y, onClick, logo, name}) => {
    return (
        <motion.div
            key={name}
            className="planet"
            onClick={() => onClick(name)}
            style={{transform: `translate(${x}px, ${y}px)`}}
            title={name}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <img src={logo} alt={`${name} Logo`}/>
        </motion.div>
    )
}