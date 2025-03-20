import "./styles.sass";

import Illustration from "./assets/Illustration.svg";
import {useEffect} from "react";
import {useBackground} from "@/common/components/Background/BackgroundContext.jsx";

export const Imprint = () => {

    const {setCircles} = useBackground();

    useEffect(() => {
        setCircles([
            {left: '-5rem', bottom: '-10rem', size: '30rem', opacity: 0.2},
            {right: '5rem', top: '10rem', size: '25rem', opacity: 0.2},
        ]);

        return () => setCircles([]);
    }, [setCircles]);

    return (
        <div className="imprint-page">
            <div className="imprint-info">
                <h1>Legal Notice</h1>
                <p>Mathias Wagner</p>
                <p>c/o COCENTER</p>
                <p>Koppoldstr. 1</p>
                <p>86551 Aichach</p>
                <br/>
                <p className="legal-notice">This Legal Notice complies with the German laws under § 5 DDG</p>
            </div>
            <img src={Illustration} alt="Illustration" className="imprint-illustration"/>
        </div>
    )
}