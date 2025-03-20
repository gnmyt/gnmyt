import "./styles.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faMessage} from "@fortawesome/free-solid-svg-icons";
import {faBluesky, faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";
import {useEffect} from "react";
import {useBackground} from "@/common/components/Background/BackgroundContext.jsx";

const socialPlatforms = [
    {
        title: "Join the discord",
        description: "Participate in polls, chat with the community and receive updates.",
        link: "https://dc.gnmyt.dev",
        icon: faDiscord
    },
    {
        title: "Send me a message",
        description: "Whether it’s just a quick hello or a question, feel free to ask.",
        link: "https://bsky.app/profile/gnm.dev",
        icon: faBluesky
    },
    {
        title: "Check out my GitHub",
        description: "I’m building all my open source software on GitHub. Check it out!",
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
        <div className="contact-page">
            <div className="info-area">
                <h1>Want to get in touch?</h1>
                <h2>Whether you have a question, want to chat or just want to say hello, I’m always happy to hear from you.</h2>
            </div>
            <div className="contact-area">
                <div className="social-platforms">
                    {socialPlatforms.map((platform) => (
                        <a className="social-platform" href={platform.link} target="_blank" rel="noopener noreferrer">
                            <div className="platform-icon">
                                <FontAwesomeIcon icon={platform.icon}/>
                            </div>
                            <div className="platform-info">
                                <h1>{platform.title}</h1>
                                <p>{platform.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
                <a className="donation-area" href="https://www.ko-fi.com/gnmyt" target="_blank" rel="noopener noreferrer">
                    <div className="icon-area">
                        <FontAwesomeIcon icon={faHeart}/>
                    </div>
                    <div className="donation-info">
                        <h1>Buy me a coffee</h1>
                        <p>Want to support my work? Your contribution will help me continue creating free and
                            open-source software.</p>
                    </div>
                </a>
            </div>
        </div>
    )
}