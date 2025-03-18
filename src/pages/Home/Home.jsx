import {useEffect, useRef} from "react";
import "./styles.sass";

export const Home = () => {
    const outerRingRef = useRef(null);
    const innerRingRef = useRef(null);

    useEffect(() => {
        const outerRing = outerRingRef.current;
        const innerRing = innerRingRef.current;

        if (!outerRing || !innerRing) return;

        const outerPlanets = [];
        for (let i = 0; i < 4; i++) {
            const planet = document.createElement("div");
            planet.className = "planet";
            planet.dataset.speed = (0.25 + (i * 0.1)).toString();
            planet.dataset.offset = (i * (Math.PI / 2)).toString();
            outerRing.appendChild(planet);
            outerPlanets.push(planet);
        }

        const innerPlanets = [];
        for (let i = 0; i < 2; i++) {
            const planet = document.createElement("div");
            planet.className = "planet";
            planet.dataset.speed = (0.4 + (i * 0.15)).toString();
            planet.dataset.offset = (i * Math.PI).toString();
            innerRing.appendChild(planet);
            innerPlanets.push(planet);
        }

        const animatePlanets = () => {
            const time = Date.now() * 0.001;

            outerPlanets.forEach(planet => {
                const speed = parseFloat(planet.dataset.speed);
                const offset = parseFloat(planet.dataset.offset);
                const angle = (time * speed + offset) % (Math.PI * 2);

                const radius = outerRing.offsetWidth / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                planet.style.transform = `translate(${x}px, ${y}px)`;
            });

            innerPlanets.forEach(planet => {
                const speed = parseFloat(planet.dataset.speed);
                const offset = parseFloat(planet.dataset.offset);
                const angle = (time * speed + offset) % (Math.PI * 2);

                const radius = innerRing.offsetWidth / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                planet.style.transform = `translate(${x}px, ${y}px)`;
            });

            requestAnimationFrame(animatePlanets);
        };

        const animationId = requestAnimationFrame(animatePlanets);

        return () => {
            cancelAnimationFrame(animationId);

            outerPlanets.forEach(planet => planet.remove());
            innerPlanets.forEach(planet => planet.remove());
        };
    }, []);

    return (
        <div className="home-page">
            <h1>A <span>Full-Stack</span> Software Developer from Germany</h1>

            <div className="orbit-container">
                <div className="orbit-ring orbit-ring-inner" ref={innerRingRef}>
                    <div className="orbit-ring orbit-ring-outer" ref={outerRingRef}>
                    </div>
                </div>
            </div>
        </div>
    );
}