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
    return {...PROJECT_DATA[projectIndex], speed, offset: i * 5, x: 0, y: 0, visible: true};
});

const updatePlanetPositions = (planets, time, radius, isMobile, held) =>
    planets.map(planet => {
        const now = held && held.name === planet.name ? held.heldAt : time;
        let angle = (now * planet.speed + planet.offset) % (Math.PI * 2);
        if (!isMobile && Math.sin(angle) > 0) angle += Math.PI;
        return {...planet, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, visible: true};
    });

const LEASH = 0.35;
const STIFFNESS = 0.08;
const DAMPING = 0.14;
const AT_REST = 0.5;

const settle = (offset, dragTarget) => {
    if (dragTarget) {
        const dx = offset.dx + (dragTarget.dx - offset.dx) * LEASH;
        const dy = offset.dy + (dragTarget.dy - offset.dy) * LEASH;
        return {dx, dy, vx: dx - offset.dx, vy: dy - offset.dy};
    }
    const vx = offset.vx * (1 - DAMPING) - offset.dx * STIFFNESS;
    const vy = offset.vy * (1 - DAMPING) - offset.dy * STIFFNESS;
    const dx = offset.dx + vx, dy = offset.dy + vy;
    if (Math.hypot(dx, dy) < AT_REST && Math.hypot(vx, vy) < AT_REST) return null;
    return {dx, dy, vx, vy};
};

const SNAP = 400;
const GRAVITY = 0.6;
const BOUNCE = 0.55;
const FRICTION = 0.995;
const PLANET_RADIUS = 52;

const dropPlanets = (planets, center) => {
    const minX = PLANET_RADIUS - center.x;
    const maxX = window.innerWidth - center.x - PLANET_RADIUS;
    const floor = window.innerHeight - center.y - PLANET_RADIUS;

    return planets.map(planet => {
        let vx = planet.vx * FRICTION;
        let vy = planet.vy + GRAVITY;
        let x = planet.x + vx;
        let y = planet.y + vy;
        if (y >= floor) { y = floor; vy = Math.abs(vy) > 1 ? -vy * BOUNCE : 0; vx *= 0.9; }
        if (x <= minX) { x = minX; vx = Math.abs(vx) * BOUNCE; }
        if (x >= maxX) { x = maxX; vx = -Math.abs(vx) * BOUNCE; }
        return {...planet, x, y, vx, vy, visible: true};
    });
};

const separatePlanets = planets => {
    const next = planets.map(planet => ({...planet}));
    for (let i = 0; i < next.length; i++) {
        for (let j = i + 1; j < next.length; j++) {
            const dx = next[j].x - next[i].x, dy = next[j].y - next[i].y;
            const distance = Math.hypot(dx, dy) || 0.01;
            const overlap = PLANET_RADIUS * 2 - distance;
            if (overlap <= 0) continue;
            const push = (overlap / 2) * (dx / distance || (i % 2 ? 1 : -1));
            next[i].x -= push;
            next[j].x += push;
            [next[i].vx, next[j].vx] = [next[j].vx * BOUNCE, next[i].vx * BOUNCE];
        }
    }
    return next;
};

const displace = (planets, offsets, drag, center) =>
    planets.map(planet => {
        const held = drag && drag.name === planet.name;
        const target = held ? {dx: drag.pointerX - center.x - planet.x, dy: drag.pointerY - center.y - planet.y} : null;
        const offset = offsets[planet.name];
        if (!offset && !target) return planet;
        const next = settle(offset || {dx: 0, dy: 0, vx: 0, vy: 0}, target);
        if (next) offsets[planet.name] = next; else delete offsets[planet.name];
        return next ? {...planet, x: planet.x + next.dx, y: planet.y + next.dy} : planet;
    });

export const Home = () => {
    const outerRingRef = useRef(null);
    const innerRingRef = useRef(null);
    const [outerPlanets, setOuterPlanets] = useState([]);
    const [innerPlanets, setInnerPlanets] = useState([]);
    const {setCircles} = useBackground();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    const offsets = useRef({});
    const drag = useRef(null);
    const moved = useRef(false);
    const fallen = useRef(null);
    const shown = useRef({outer: [], inner: []});
    shown.current = {outer: outerPlanets, inner: innerPlanets};

    useEffect(() => {
        const baseSpeed = isMobile ? 0.03 : 0.04;
        setOuterPlanets(createPlanets(2, 'outer', baseSpeed, 0));
        setInnerPlanets(createPlanets(5, 'inner', baseSpeed * 1.5, 2));

        setCircles([{bottom: '-20rem', size: '35rem'}]);

        return () => setCircles([]);
    }, [setCircles, isMobile]);

    useEffect(() => {
        const outerRing = outerRingRef.current;
        const innerRing = innerRingRef.current;

        if (!outerRing || !innerRing || outerPlanets.length === 0 || innerPlanets.length === 0) return;

        let running = true;
        const animatePlanets = () => {
            if (!running) return;
            const time = Date.now() * 0.001;
            const rect = innerRing.getBoundingClientRect();
            const center = {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};

            if (fallen.current) {
                fallen.current = separatePlanets(dropPlanets(fallen.current, center));
                setOuterPlanets(fallen.current.filter(body => body.ring === "outer"));
                setInnerPlanets(fallen.current.filter(body => body.ring === "inner"));
                requestAnimationFrame(animatePlanets);
                return;
            }

            setOuterPlanets(prev => displace(updatePlanetPositions(prev, time, outerRing.offsetWidth / 2, isMobile, drag.current), offsets.current, drag.current, center));
            setInnerPlanets(prev => displace(updatePlanetPositions(prev, time, innerRing.offsetWidth / 2, isMobile, drag.current), offsets.current, drag.current, center));

            requestAnimationFrame(animatePlanets);
        };

        requestAnimationFrame(animatePlanets);
        return () => { running = false; };
    }, [outerPlanets.length, innerPlanets.length, isMobile]);

    useEffect(() => {
        const onMove = event => {
            if (!drag.current) return;
            if (Math.hypot(event.clientX - drag.current.startX, event.clientY - drag.current.startY) > 4) moved.current = true;
            drag.current = {...drag.current, pointerX: event.clientX, pointerY: event.clientY};
        };
        const onUp = () => {
            const held = drag.current;
            drag.current = null;
            if (!held) return;

            const paused = Date.now() * 0.001 - held.heldAt;
            const rephase = planets => planets.map(planet => planet.name === held.name ? {...planet, offset: planet.offset - planet.speed * paused} : planet);
            setOuterPlanets(rephase);
            setInnerPlanets(rephase);

            if (Math.hypot(held.pointerX - held.startX, held.pointerY - held.startY) < SNAP) return;
            offsets.current = {};
            const kick = ring => planet => ({...planet, ring, vx: (Math.random() - 0.5) * 4, vy: 0});
            fallen.current = [...shown.current.outer.map(kick("outer")), ...shown.current.inner.map(kick("inner"))];
        };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
        };
    }, []);

    const handlePlanetGrab = (name, event) => {
        moved.current = false;
        drag.current = {name, heldAt: Date.now() * 0.001, startX: event.clientX, startY: event.clientY, pointerX: event.clientX, pointerY: event.clientY};
        if (!fallen.current) return;

        const time = Date.now() * 0.001;
        const restore = (bodies, ring) => {
            const orbit = updatePlanetPositions(bodies, time, ring.offsetWidth / 2, isMobile);
            orbit.forEach((planet, index) => { offsets.current[planet.name] = {dx: bodies[index].x - planet.x, dy: bodies[index].y - planet.y, vx: 0, vy: 0}; });
            return orbit;
        };
        setOuterPlanets(restore(fallen.current.filter(body => body.ring === "outer"), outerRingRef.current));
        setInnerPlanets(restore(fallen.current.filter(body => body.ring === "inner"), innerRingRef.current));
        fallen.current = null;
    };

    const handlePlanetClick = (planetName) => {
        if (moved.current) return;
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
                        <Planet key={planet.name} {...planet} onClick={handlePlanetClick} onGrab={handlePlanetGrab}/>))}
                    <div className="orbit-ring orbit-ring-outer" ref={outerRingRef}>
                        {outerPlanets.map(planet => planet.visible && (
                            <Planet key={planet.name} {...planet} onClick={handlePlanetClick} onGrab={handlePlanetGrab}/>))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
