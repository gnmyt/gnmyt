import "./styles.sass";
import {motion} from "framer-motion";

const BIRTHDAY = {year: 2006, month: 4, day: 19};

const age = () => {
    const now = new Date();
    const hadBirthday = now.getMonth() + 1 > BIRTHDAY.month || (now.getMonth() + 1 === BIRTHDAY.month && now.getDate() >= BIRTHDAY.day);
    return now.getFullYear() - BIRTHDAY.year - (hadBirthday ? 0 : 1);
};

export const Title = () => (
    <motion.div
        className="title-block"
        initial={{opacity: 0, y: "1.5rem"}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: "-1.5rem"}}
        transition={{duration: 0.8, ease: "easeInOut"}}>
        <h1 className="title-text">I build the tools<br/>I'd want to <span>self-host.</span></h1>
        <p className="title-lead">
            I'm Mathias, a {age()}-year-old developer from Germany. Most of my work is open source:
            Nexterm, tunlit and a few more, all made to run on your own server. Say hello anytime!
        </p>
    </motion.div>
);
