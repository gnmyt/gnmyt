import "./styles.sass";

import ProfileImage from "@/common/images/profile.png";
import {Link} from "react-router";
import {Fragment} from "react";

const navigation = {
    "Home": "/",
    "Projects": "/projects",
    "Contact": "/contact",
}

export const Navigation = () => {
    return (
        <nav>
            <Link className="title-area">
                <img src={ProfileImage} alt="Profile" className="profile-image"/>
                <h1>GNM <span>.dev</span></h1>
            </Link>
            <div className="nav-area">
                {Object.keys(navigation).map(key => (
                    <Fragment key={key}>
                        <Link className="nav-item" to={navigation[key]}>{key}</Link>
                        {key !== Object.keys(navigation)[Object.keys(navigation).length - 1] && <div className="nav-divider" />}
                    </Fragment>
                ))}
            </div>
        </nav>
    )
}