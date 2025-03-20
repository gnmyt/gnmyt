import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faMessage} from "@fortawesome/free-solid-svg-icons";
import {faBluesky, faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";
import {useEffect} from "react";
import {useBackground} from "@/common/components/Background/BackgroundContext.jsx";
import {motion} from "framer-motion";

const socialPlatforms = [
    {
        title: "Join the discord",
        description: "Participate in polls, chat with the community and receive updates.",
        link: "https://dc.gnmyt.dev",
        icon: faDiscord
    },
    {
        title: "Send me a message",
        description: "Whether it's just a quick hello or a question, feel free to ask.",
        link: "https://bsky.app/profile/gnm.dev",
        icon: faBluesky
    },
    {
        title: "Check out my GitHub",
        description: "I'm building all my open source software on GitHub. Check it out!",
        link: "https://github.com/gnmyt",
        icon: faGithub
    },
    {
        title: "Send me an email",
        description: "Want to get in touch? Send me an email at mathias@gnm.dev",
        link: "mailto:mathias@gnm.dev",
        icon: faMessage
    }
];

const containerVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.1, delayChildren: 0.2}}
};

const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {y: 0, opacity: 1, transition: {duration: 0.5}}
};

const donationVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {y: 0, opacity: 1, transition: {duration: 0.5, delay: 1}}
};

export const Contact = () => {
    const {setCircles} = useBackground();

    useEffect(() => {
        setCircles([
            {top: '10rem', right: '10rem', size: '20rem', opacity: 0.2},
            {bottom: '10rem', left: '-10rem', size: '25rem', opacity: 0.2}
        ]);
        return () => setCircles([]);
    }, [setCircles]);

    return (
        <motion.div className="contact-page" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div className="info-area" variants={itemVariants}>
                <h1>Want to get in touch?</h1>
                <h2>Whether you have a question, want to chat or just want to say hello, I'm always happy to hear from
                    you.</h2>
            </motion.div>

            <div className="contact-area">
                <motion.div className="social-platforms" variants={containerVariants}>
                    {socialPlatforms.map((platform, index) => (
                        <motion.a
                            key={index}
                            className="social-platform"
                            href={platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{scale: 1.03, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"}}
                            whileTap={{scale: 0.98}}>
                            <motion.div
                                className="platform-icon"
                                whileHover={{scale: 1.1, rotate: [0, -5, 5, -5, 0]}}
                                transition={{duration: 0.5}}>
                                <FontAwesomeIcon icon={platform.icon}/>
                            </motion.div>
                            <div className="platform-info">
                                <h1>{platform.title}</h1>
                                <p>{platform.description}</p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                <motion.a
                    className="donation-area"
                    href="https://www.ko-fi.com/gnmyt"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={donationVariants}
                    whileHover={{scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"}}
                    whileTap={{scale: 0.98}}>
                    <motion.div
                        className="icon-area"
                        whileHover={{scale: 1.1,}}
                        animate={{scale: [1, 1.1, 1],}}
                        transition={{duration: 1.5, repeat: Infinity, repeatType: "reverse"}}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </motion.div>
                    <div className="donation-info">
                        <h1>Buy me a coffee</h1>
                        <p>Want to support my work? Your contribution will help me continue creating free and
                            open-source software.</p>
                    </div>
                </motion.a>
            </div>
        </motion.div>
    )
}