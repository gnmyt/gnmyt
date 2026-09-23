import "./styles.sass";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

export const ScreenshotDialog = ({onClose, image, alt}) => {
    return (
        <motion.div
            className="screenshot-dialog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            onClick={onClose}
        >
            <button type="button" className="screenshot-dialog-close" onClick={onClose} aria-label="Close">
                <FontAwesomeIcon icon={faXmark}/>
            </button>
            <motion.div
                className="screenshot-dialog-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.15 } }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <img src={image} alt={alt} onClick={onClose} style={{ cursor: 'pointer' }} />
            </motion.div>
        </motion.div>
    );
};