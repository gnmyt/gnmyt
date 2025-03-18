import {useEffect, useRef, useState} from "react";
import "./styles.sass";

export const Home = () => {
    const outerRingRef = useRef(null);
    const innerRingRef = useRef(null);
    const [outerPlanets, setOuterPlanets] = useState([]);
    const [innerPlanets, setInnerPlanets] = useState([]);

    useEffect(() => {
        const outerPlanetsData = Array.from({length: 4}, (_, i) => ({
            id: `outer-${i}`,
            speed: 0.25 + (i * 0.1),
            offset: i * (Math.PI / 2),
            x: 0,
            y: 0,
        }));

        const innerPlanetsData = Array.from({length: 2}, (_, i) => ({
            id: `inner-${i}`,
            speed: 0.4 + (i * 0.15),
            offset: i * Math.PI,
            x: 0,
            y: 0,
        }));

        setOuterPlanets(outerPlanetsData);
        setInnerPlanets(innerPlanetsData);
    }, []);

    useEffect(() => {
        const outerRing = outerRingRef.current;
        const innerRing = innerRingRef.current;

        if (!outerRing || !innerRing || outerPlanets.length === 0 || innerPlanets.length === 0) return;

        const animatePlanets = () => {
            const time = Date.now() * 0.001;

            setOuterPlanets(prevPlanets => prevPlanets.map(planet => {
                const angle = (time * planet.speed + planet.offset) % (Math.PI * 2);
                const radius = outerRing.offsetWidth / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return {...planet, x, y};
            }));

            setInnerPlanets(prevPlanets => prevPlanets.map(planet => {
                const angle = (time * planet.speed + planet.offset) % (Math.PI * 2);
                const radius = innerRing.offsetWidth / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return {...planet, x, y};
            }));

            requestAnimationFrame(animatePlanets);
        };

        const animationId = requestAnimationFrame(animatePlanets);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [outerPlanets.length, innerPlanets.length]);

    const handlePlanetClick = (planetId) => {
        console.log(`Planet clicked: ${planetId}`);
    };

    return (
        <div className="home-page">
            <h1>A <span>Full-Stack</span> Software Developer from Germany</h1>

            <div className="orbit-container">
                <div className="orbit-ring orbit-ring-inner" ref={innerRingRef}>
                    {innerPlanets.map(planet => (
                        <div key={planet.id} className="planet" onClick={() => handlePlanetClick(planet.id)}
                             style={{transform: `translate(${planet.x}px, ${planet.y}px)`}}>
                            <img src="https://place-hold.it/500x500.png" alt="Planet Logo"/>
                        </div>
                    ))}
                    <div className="orbit-ring orbit-ring-outer" ref={outerRingRef}>
                        {outerPlanets.map(planet => (
                            <div key={planet.id} className="planet" onClick={() => handlePlanetClick(planet.id)}
                                 style={{transform: `translate(${planet.x}px, ${planet.y}px)`}}>
                                <img src="https://place-hold.it/500x500.png" alt="Planet Logo"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}