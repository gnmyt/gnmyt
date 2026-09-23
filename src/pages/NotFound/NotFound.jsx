import "./styles.sass";
import {useEffect} from "react";
import {Link, useLocation} from "react-router";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faHouse, faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import {useBackground} from "@/common/components/Background/BackgroundContext.jsx";
import ProfileImage from "@/common/images/profile.png";

const places = [
    {title: "Home", path: "/", icon: faHouse},
    {title: "Projects", path: "/projects", icon: faLayerGroup},
    {title: "Contact", path: "/contact", icon: faEnvelope},
];

export const NotFound = () => {
    const {setCircles} = useBackground();
    const {pathname} = useLocation();

    useEffect(() => {
        setCircles([{right: '-12rem', bottom: '-12rem', size: '30rem', opacity: 0.15}]);
        return () => setCircles([]);
    }, [setCircles]);

    return (
        <motion.div className="not-found-page" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                    transition={{duration: 0.5}}>
            <div className="not-found-text">
                <span className="not-found-code">404</span>
                <h1>Lost in orbit.</h1>
                <p>
                    <code>gnm.dev{pathname}</code> doesn't exist. It may have moved, or it never was.
                </p>
                <div className="not-found-links">
                    {places.map(place => (
                        <Link key={place.path} to={place.path}>
                            <FontAwesomeIcon icon={place.icon}/>
                            {place.title}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="not-found-orbit" aria-hidden="true">
                <div className="orbit-ring">
                    <div className="orbit-satellite">
                        <img src={ProfileImage} alt=""/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
