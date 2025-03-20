import {useEffect, useState} from 'react';
import "./styles.sass";

export const Cursor = () => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            requestAnimationFrame(() => {
                setPosition({x: e.clientX, y: e.clientY});
                const target = e.target;
                setIsHovering(
                    target.tagName.toLowerCase() === 'a' ||
                    target.tagName.toLowerCase() === 'button' ||
                    target.getAttribute('role') === 'button' ||
                    target.hasAttribute('onclick')
                );
            });
        };

        window.addEventListener('mousemove', updatePosition, {passive: true});
        return () => window.removeEventListener('mousemove', updatePosition);
    }, []);

    return (
        <div
            className={`cursor ${isHovering ? 'hover' : ''}`}
            style={{left: `${position.x}px`, top: `${position.y}px`}}
        />
    );
};