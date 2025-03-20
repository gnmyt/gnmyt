import "./styles.sass";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

export const Title = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const words = ["Full-Stack", "Java", "React", "JavaScript", "TypeScript"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <motion.h1
            className="title-text"
            initial={{opacity: 0, y: "5rem"}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: "-5rem"}}
            transition={{duration: 0.8, ease: "easeInOut"}}>
            A <span className="word-animation-container">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={words[currentWordIndex]}
                            initial={{y: -20, opacity: 0}}
                            animate={{
                                y: 0, opacity: 1,
                                transition: {
                                    y: {duration: 0.5, ease: "easeOut"},
                                    opacity: {duration: 0.3, ease: "easeOut"}
                                }
                            }}
                            exit={{
                                y: 20,
                                opacity: 0,
                                transition: {
                                    y: {duration: 0.5, ease: "easeIn"},
                                    opacity: {duration: 0.3, ease: "easeIn"}
                                }
                            }}
                            className="animated-word"
                        >
                            {words[currentWordIndex]}
                        </motion.span>
                    </AnimatePresence>
                </span> Software Developer from Germany
        </motion.h1>
    )
}