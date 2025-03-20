import "./styles.sass";
import {Link} from "react-router";
import {motion} from "framer-motion";

export const Footer = () => {
    return (
        <motion.footer
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 50}}
            transition={{duration: 1, ease: "easeInOut"}}>
            <div className="footer-links">
                <Link to="/imprint">Legal Notice</Link>
                <div className="footer-divider"/>
                <Link to="/privacy">Privacy Policy</Link>
            </div>
        </motion.footer>
    )
}