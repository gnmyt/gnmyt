import "./styles.sass";
import Illustration from "./assets/Illustration.svg";
import {useEffect} from "react";
import {useBackground} from "@/common/components/Background/BackgroundContext.jsx";
import {motion} from "framer-motion";

export const Imprint = () => {

    const {setCircles} = useBackground();

    useEffect(() => {
        setCircles([
            {left: '-5rem', bottom: '-10rem', size: '30rem', opacity: 0.2},
            {right: '5rem', top: '10rem', size: '25rem', opacity: 0.2},
        ]);

        return () => setCircles([]);
    }, [setCircles]);

    return (
        <motion.div
            className="imprint-page"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0, transition: {duration: 0.8, ease: "easeOut"}}}
            exit={{opacity: 0, y: -20}}>
            <motion.div
                className="imprint-info"
                initial={{opacity: 0, x: -50}}
                animate={{opacity: 1, x: 0, transition: {duration: 0.6, ease: "easeOut", delay: 0.2}}}>
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0, transition: {delay: 0.3}}}>
                    Legal Notice
                </motion.h1>
                <motion.div
                    className="address"
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {delay: 0.5, staggerChildren: 0.1}}}>
                    <p>Mathias Wagner</p>
                    <p>c/o COCENTER</p>
                    <p>Koppoldstr. 1</p>
                    <p>86551 Aichach</p>
                </motion.div>
                <motion.p
                    className="legal-notice"
                    initial={{opacity: 0}}
                    animate={{opacity: 0.7, transition: {delay: 0.8}}}>
                    This Legal Notice complies with the German laws under § 5 DDG
                </motion.p>
            </motion.div>
            <motion.div
                className="illustration-container"
                initial={{opacity: 0, x: 100}}
                animate={{opacity: 1, x: 0, transition: {duration: 0.8, ease: "easeOut", delay: 0.2}}}>
                <img src={Illustration} alt="Illustration" className="imprint-illustration"/>
            </motion.div>
        </motion.div>
    );
}