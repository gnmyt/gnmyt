import "./styles.sass";
import {useBackground} from "@/common/components/Background/BackgroundContext.jsx";
import {motion} from "framer-motion";

export const Background = () => {
    const {circles} = useBackground();

    return (
        <div className="background">
            {circles.map((circle) => (
                <motion.div
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    exit={{scale: 0}}
                    transition={{duration: 0.8}}
                    key={JSON.stringify(circle)}
                    className="background-circle"
                    style={{
                        left: circle.left,
                        top: circle.top,
                        bottom: circle.bottom,
                        right: circle.right,
                        width: circle.size || '30rem',
                        height: circle.size || '30rem',
                        opacity: circle.opacity
                    }}
                />
            ))}
        </div>
    );
}