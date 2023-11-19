import "./styles.sass";
import BackCard from "@/common/components/BackCard";
import ContactCard from "@/pages/Contact/components/ContactCard";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faDiscord, faGithub, faInstagram} from "@fortawesome/free-brands-svg-icons";

const methods = [
    {
        icon: faEnvelope,
        link: "mailto:contact@gnmyt.dev",
        text: <>Schreibe mir eine E-Mail an <span>contact@gnmyt.dev</span></>
    },
    {
        icon: faInstagram,
        link: "https://www.instagram.com/germannewsmaker",
        text: <>Schreibe mir auf Instagram <span>@germannewsmaker</span></>
    },
    {
        icon: faDiscord,
        link: "https://discord.com/users/386242172632170496",
        text: <>Schreibe mir auf Discord unter <span>GNM#0001</span></>
    },
    {
        icon: faGithub,
        link: "https://github.com/gnmyt",
        text: <>Besuche mein GitHub unter <span>github.com/gnmyt</span></>
    }
]

export const Contact = () => (
    <div className="page-wrapper">
        <BackCard currentPage="Kontakt"/>
        <div className="contact-wrapper">
            {methods.map(method => <ContactCard icon={method.icon} text={method.text} link={method.link}
                                                key={method.link}/>)}
        </div>
    </div>
);