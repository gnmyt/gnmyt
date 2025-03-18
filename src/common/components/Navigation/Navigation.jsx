import "./styles.sass";

import ProfileImage from "@/common/images/profile.png";
import {Link} from "react-router";

const navigation = {
    "Home": "/",
    "Projects": "/projects",
    "Contact": "/contact",
}

export const Navigation = () => {
    return (
        <nav>
            <div className="title-area">
                <img src={ProfileImage} alt="Profile" className="profile-image"/>
                <h1>GNM <span>.dev</span></h1>
            </div>
            <div className="nav-area">
                {Object.keys(navigation).map(key => (
                    <>
                        <Link key={key} className="nav-item" to={navigation[key]}>{key}</Link>
                        {key !== Object.keys(navigation)[Object.keys(navigation).length - 1] && <div className="nav-divider" />}
                    </>
                ))}
            </div>
        </nav>
    )
}