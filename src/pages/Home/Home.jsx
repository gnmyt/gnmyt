import {useEffect, useRef, useState} from "react";
import "./styles.sass";
import Planet from "@/pages/Home/components/Planet";
import {motion} from "framer-motion";
import Title from "@/pages/Home/components/Title";
import {useBackground} from "@/common/components/Background/BackgroundContext";

import {PROJECT_DATA} from "@/pages/Projects/Projects.jsx";

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e) => setMatches(e.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
};

const createPlanets = (count, prefix, speed, startIndex = 0) => Array.from({length: count}, (_, i) => {
    const projectIndex = startIndex + i;
    return {...PROJECT_DATA[projectIndex], speed, offset: i * 5, x: 0, y: 0, visible: true, lastAngle: i * 5};
});

const isPlanetVisible = (y, isMobile) => isMobile ? true : y < 0;

const updatePlanetPositions = (planets, time, radius, isMobile) =>
    planets.map(planet => {
        const angle = (time * planet.speed + planet.offset) % (Math.PI * 2);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const currentlyVisible = isPlanetVisible(y, isMobile);

        if (planet.visible && !currentlyVisible) {
            const newAngle = (angle + Math.PI) % (Math.PI * 2);
            return {
                ...planet, x: Math.cos(newAngle) * radius, y: Math.sin(newAngle) * radius, visible: true,
                lastAngle: newAngle
            };
        }

        return {...planet, x, y, visible: currentlyVisible, lastAngle: angle};
    });

export const Home = () => {
    const outerRingRef = useRef(null);
    const innerRingRef = useRef(null);
    const [outerPlanets, setOuterPlanets] = useState([]);
    const [innerPlanets, setInnerPlanets] = useState([]);
    const {setCircles} = useBackground();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        const baseSpeed = isMobile ? 0.03 : 0.04;
        setOuterPlanets(createPlanets(2, 'outer', baseSpeed, 0));
        setInnerPlanets(createPlanets(4, 'inner', baseSpeed * 1.5, 2));

        setCircles([{bottom: '-20rem', size: '35rem'}]);

        return () => setCircles([]);
    }, [setCircles, isMobile]);

    useEffect(() => {
        const outerRing = outerRingRef.current;
        const innerRing = innerRingRef.current;

        if (!outerRing || !innerRing || outerPlanets.length === 0 || innerPlanets.length === 0) return;

        const animatePlanets = () => {
            const time = Date.now() * 0.001;

            setOuterPlanets(prev => updatePlanetPositions(prev, time, outerRing.offsetWidth / 2, isMobile));
            setInnerPlanets(prev => updatePlanetPositions(prev, time, innerRing.offsetWidth / 2, isMobile));

            requestAnimationFrame(animatePlanets);
        };

        const animationId = requestAnimationFrame(animatePlanets);
        return () => cancelAnimationFrame(animationId);
    }, [outerPlanets.length, innerPlanets.length, isMobile]);

    const handlePlanetClick = (planetName) => {
        const project = [...outerPlanets, ...innerPlanets].find(p => p.name === planetName);
        if (project && project.link) {
            window.open(project.link, '_blank');
        }
    };

    return (
        <motion.div className="home-page">
            <Title/>
            <motion.div
                className="orbit-container"
                initial={{opacity: 0, bottom: "-120rem"}}
                animate={{opacity: 1, bottom: isMobile ? "-30rem" : "-60rem"}}
                exit={{opacity: 0, bottom: "-120rem"}}
                transition={{duration: 0.8, ease: "easeInOut"}}>
                <div className="orbit-ring orbit-ring-inner" ref={innerRingRef}>
                    {innerPlanets.map(planet => planet.visible && (
                        <Planet key={planet.name} {...planet} onClick={handlePlanetClick}/>))}
                    <div className="orbit-ring orbit-ring-outer" ref={outerRingRef}>
                        {outerPlanets.map(planet => planet.visible && (
                            <Planet key={planet.name} {...planet} onClick={handlePlanetClick}/>))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}