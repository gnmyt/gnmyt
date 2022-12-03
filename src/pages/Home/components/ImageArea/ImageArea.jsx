import "./styles.sass";
import ProfileImage from "@/common/images/profile.png";
import MySpeedImage from "@/common/images/apps/myspeed.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCookie} from "@fortawesome/free-solid-svg-icons";
import LicenseAPIImage from "@/common/images/apps/licenseapi.png";
import SheepstarImage from "@/common/images/apps/sheepstar.png";
import SierraImage from "@/common/images/apps/sierra.png";
import {useState} from "react";

const ImageArea = () => {
    const [rotate, setRotate] = useState(0);
    const [clicks, setClicks] = useState(0);

    const triggerRotate = () => setRotate(rotate+1);

    const clickCookie = () => {
        if (clicks < 999) setClicks(clicks+1);
    }

    const resetCookies = (e) => {
        e.preventDefault();
        setClicks(0);
    }

    return (
        <div className="image-area">
            <div className="item profile-item" onClick={triggerRotate}>
                <img src={ProfileImage} alt="Profile" className={rotate >= 3 ? "rotate" : ""}/>
            </div>

            <div className="item">
                <img src={MySpeedImage} alt="LicenseAPI"/>
            </div>

            <div className="item item-box" onClick={clickCookie} onContextMenu={resetCookies}>
                {clicks !== 0 && <p>{clicks}</p>}
                {clicks === 0 && <FontAwesomeIcon icon={faCookie}/>}
            </div>

            <div className="item">
                <img src={LicenseAPIImage} alt="LicenseAPI"/>
            </div>

            <div className="item">
                <img src={SheepstarImage} alt="Sheepstar"/>
            </div>

            <div className="item">
                <img src={SierraImage} alt=""/>
            </div>
        </div>
    )
}



export default ImageArea;