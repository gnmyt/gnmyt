import "./styles.sass";
import {Link} from "react-router";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScaleBalanced, faShieldHalved} from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
    return (
        <motion.footer
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 50}}
            transition={{duration: 1, ease: "easeInOut"}}>
            <div className="footer-links">
                <Link to="/imprint"><FontAwesomeIcon icon={faScaleBalanced}/>Legal Notice</Link>
                <div className="footer-divider"/>
                <Link to="/privacy"><FontAwesomeIcon icon={faShieldHalved}/>Privacy Policy</Link>
            </div>
        </motion.footer>
    )
}