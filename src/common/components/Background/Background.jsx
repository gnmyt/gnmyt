import "./styles.sass";
import {useBackground} from "@/common/components/Background/BackgroundContext.jsx";

export const Background = () => {
    const {circles} = useBackground();

    return (
        <div className="background">
            {circles.map((circle, index) => (
                <div 
                    key={index}
                    className="background-circle"
                    style={{
                        left: circle.left,
                        top: circle.top,
                        bottom: circle.bottom,
                        right: circle.right,
                        width: circle.size || '30rem',
                        height: circle.size || '30rem'
                    }}
                />
            ))}
        </div>
    );
}