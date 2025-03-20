import {useEffect, useRef, useState} from "react";
import "./styles.sass";
import Planet from "@/pages/Home/components/Planet";
import {motion} from "framer-motion";
import Title from "@/pages/Home/components/Title";

const createPlanets = (count, prefix, speed) => Array.from({length: count}, (_, i) => ({
    id: `${prefix}-${i}`, speed, offset: i * 5, x: 0, y: 0,
    visible: true, lastAngle: i * 5
}));

const isPlanetVisible = (y) => y < 0;

const updatePlanetPositions = (planets, time, radius) =>
    planets.map(planet => {
        const angle = (time * planet.speed + planet.offset) % (Math.PI * 2);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const currentlyVisible = isPlanetVisible(y);

        if (planet.visible && !currentlyVisible) {
            const newAngle = (angle + Math.PI) % (Math.PI * 2);
            return {
                ...planet, x: Math.cos(newAngle) * radius, y: Math.sin(newAngle) * radius,
                visible: true, lastAngle: newAngle
            };
        }

        return {...planet, x, y, visible: currentlyVisible, lastAngle: angle};
    });

export const Home = () => {
    const outerRingRef = useRef(null);
    const innerRingRef = useRef(null);
    const [outerPlanets, setOuterPlanets] = useState([]);
    const [innerPlanets, setInnerPlanets] = useState([]);

    useEffect(() => {
        setOuterPlanets(createPlanets(2, 'outer', 0.04, Math.PI / 2));
        setInnerPlanets(createPlanets(4, 'inner', 0.06, Math.PI));
    }, []);

    useEffect(() => {
        const outerRing = outerRingRef.current;
        const innerRing = innerRingRef.current;

        if (!outerRing || !innerRing || outerPlanets.length === 0 || innerPlanets.length === 0) return;

        const animatePlanets = () => {
            const time = Date.now() * 0.001;

            setOuterPlanets(prev => updatePlanetPositions(prev, time, outerRing.offsetWidth / 2));
            setInnerPlanets(prev => updatePlanetPositions(prev, time, innerRing.offsetWidth / 2));

            requestAnimationFrame(animatePlanets);
        };

        const animationId = requestAnimationFrame(animatePlanets);
        return () => cancelAnimationFrame(animationId);
    }, [outerPlanets.length, innerPlanets.length]);

    const handlePlanetClick = (planetId) => {
        console.log(`Planet clicked: ${planetId}`);
    };

    return (
        <motion.div className="home-page">
            <Title />

            <motion.div
                className="orbit-container"
                initial={{opacity: 0, bottom: "-120rem"}}
                animate={{opacity: 1, bottom: "-60rem"}}
                exit={{opacity: 0, bottom: "-120rem"}}
                transition={{duration: 0.8, ease: "easeInOut"}}>
                <div className="orbit-ring orbit-ring-inner" ref={innerRingRef}>
                    {innerPlanets.map(planet => planet.visible && (
                        <Planet key={planet.id}{...planet} onClick={handlePlanetClick}/>))}
                    <div className="orbit-ring orbit-ring-outer" ref={outerRingRef}>
                        {outerPlanets.map(planet => planet.visible && (
                            <Planet key={planet.id}{...planet} onClick={handlePlanetClick}/>))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}