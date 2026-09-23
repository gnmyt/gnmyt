import "./styles.sass";
import ProfileImage from "@/common/images/profile.png";
import {Link} from "react-router";
import {Fragment, useState} from "react";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faHouse, faLayerGroup} from "@fortawesome/free-solid-svg-icons";

const navigation = [
    {title: "Home", path: "/", icon: faHouse},
    {title: "Projects", path: "/projects", icon: faLayerGroup},
    {title: "Contact", path: "/contact", icon: faEnvelope},
];

export const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [isRotating, setIsRotating] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const handleLogoClick = () => {
        const newCount = (clickCount + 1) % 4;
        setClickCount(newCount);
        
        if (newCount === 3) {
            setIsRotating(true);
            setTimeout(() => {
                setIsRotating(false);
                setClickCount(0);
            }, 1000);
        }
    };

    return (
        <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={mobileMenuOpen ? "mobile-open" : ""}>
            <Link className="title-area" to="/">
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    animate={isRotating ? { rotate: 360 } : { rotate: 0 }}
                    transition={isRotating ? { duration: 1, type: "tween" } : { type: "spring", stiffness: 300 }}
                    src={ProfileImage} 
                    alt="Profile" 
                    className="profile-image"
                    onClick={handleLogoClick}/>
                <motion.h1
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                    GNM<span>.dev</span>
                </motion.h1>
            </Link>

            <motion.button 
                className="mobile-menu-toggle" 
                onClick={toggleMobileMenu}
                whileTap={{ scale: 0.95 }}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </motion.button>

            <div className="nav-area">
                {navigation.map((entry, index) => (
                    <Fragment key={entry.path}>
                        <Link
                            className="nav-item"
                            to={entry.path}
                            onClick={() => setMobileMenuOpen(false)}>
                            <FontAwesomeIcon icon={entry.icon}/>
                            {entry.title}
                        </Link>
                        {index < navigation.length - 1 && <div className="nav-divider" />}
                    </Fragment>
                ))}
            </div>
        </motion.nav>
    )
}