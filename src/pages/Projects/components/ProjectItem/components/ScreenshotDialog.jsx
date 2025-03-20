import "./styles.sass";
import {motion} from "framer-motion";

export const ScreenshotDialog = ({onClose, image, alt}) => {
    return (
        <motion.div
            className="screenshot-dialog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="screenshot-dialog-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
            >
                <img src={image} alt={alt} onClick={onClose} style={{ cursor: 'pointer' }} />
            </motion.div>
        </motion.div>
    );
};