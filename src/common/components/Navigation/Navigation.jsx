import "./styles.sass";

import ProfileImage from "@/common/images/profile.png";
import {Link} from "react-router";
import {Fragment, useState} from "react";

const navigation = {
    "Home": "/",
    "Projects": "/projects",
    "Contact": "/contact",
}

export const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <nav className={mobileMenuOpen ? "mobile-open" : ""}>
            <Link className="title-area" to="/">
                <img src={ProfileImage} alt="Profile" className="profile-image"/>
                <h1>GNM<span>.dev</span></h1>
            </Link>
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>
            <div className="nav-area">
                {Object.keys(navigation).map(key => (
                    <Fragment key={key}>
                        <Link className="nav-item" to={navigation[key]} onClick={() => setMobileMenuOpen(false)}>
                            {key}
                        </Link>
                        {key !== Object.keys(navigation)[Object.keys(navigation).length - 1] &&
                            <div className="nav-divider"/>}
                    </Fragment>
                ))}
            </div>
        </nav>
    )
}