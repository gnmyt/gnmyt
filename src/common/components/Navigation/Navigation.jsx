import "./styles.sass";
import ProfileImage from "@/common/images/profile.png";
import {Link} from "react-router";
import {Fragment, useState} from "react";
import {motion} from "framer-motion";

const navigation = {
    "Home": "/",
    "Projects": "/projects",
    "Contact": "/contact",
}

export const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={mobileMenuOpen ? "mobile-open" : ""}>
            <Link className="title-area" to="/">
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src={ProfileImage} 
                    alt="Profile" 
                    className="profile-image"/>
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
                {Object.keys(navigation).map((key) => (
                    <Fragment key={key}>
                        <Link 
                            className="nav-item" 
                            to={navigation[key]} 
                            onClick={() => setMobileMenuOpen(false)}>
                            {key}
                        </Link>
                        {key !== Object.keys(navigation)[Object.keys(navigation).length - 1] &&
                            <div className="nav-divider" />}
                    </Fragment>
                ))}
            </div>
        </motion.nav>
    )
}