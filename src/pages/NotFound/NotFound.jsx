import "./styles.sass";
import {useEffect} from "react";
import {useBackground} from "@/common/components/Background/BackgroundContext.jsx";
import {motion} from "framer-motion";
import {Link} from "react-router";

export const NotFound = () => {
    const {setCircles} = useBackground();

    useEffect(() => {
        setCircles([
            {right: '-10rem', bottom: '-15rem', size: '35rem', opacity: 0.2},
            {left: '5rem', top: '5rem', size: '25rem', opacity: 0.2},
        ]);
        return () => setCircles([]);
    }, [setCircles]);

    return (
        <motion.div 
            className="not-found-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div 
                className="content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Link to="/" className="home-button">
                        Return Home
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}