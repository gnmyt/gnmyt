import "./styles.sass";

import {motion} from "framer-motion";
import {useState} from "react";
import {PROJECT_DATA} from "@/pages/Projects/Projects.jsx";

export const ProjectItem = ({project, index}) => {
    const [loadingScreenshots, setLoadingScreenshots] = useState(new Array(project.screenshots.length).fill(true));

    const itemVariants = {
        hidden: {y: 50, opacity: 0},
        visible: {y: 0, opacity: 1, transition: {type: "spring", stiffness: 100}}
    };

    const loadingVariants = {
        animate: {
            background: [
                "linear-gradient(90deg, rgba(227, 63, 63, 0.1) 0%, rgba(227, 63, 63, 0.2) 50%, rgba(227, 63, 63, 0.1) 100%)",
                "linear-gradient(90deg, rgba(227, 63, 63, 0.1) 100%, rgba(227, 63, 63, 0.2) 0%, rgba(227, 63, 63, 0.1) 50%)",
                "linear-gradient(90deg, rgba(227, 63, 63, 0.1) 50%, rgba(227, 63, 63, 0.2) 100%, rgba(227, 63, 63, 0.1) 0%)",
                "linear-gradient(90deg, rgba(227, 63, 63, 0.1) 0%, rgba(227, 63, 63, 0.2) 50%, rgba(227, 63, 63, 0.1) 100%)"
            ],
            transition: {duration: 1.5, repeat: Infinity, ease: "linear"}
        }
    };

    const handleImageLoad = (idx) => setLoadingScreenshots(prev => ({...prev, [idx]: false}));
    const handleImageError = (idx) => setLoadingScreenshots(prev => ({...prev, [idx]: false}));

    return (
        <motion.div
            key={project.name}
            className="project-item"
            variants={itemVariants}
        >
            <div className="project-header">
                <div className="project-logo-container">
                    <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        className="project-logo"
                    />
                </div>

                <div className="project-info">
                    <div className="project-title-row">
                        <h2 className="project-title">{project.name}</h2>
                        <p className="project-year">{project.year}</p>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-technologies">
                        {project.technologies.map(tech => (
                            <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                    </div>

                    <a href={project.link} className="project-link" target="_blank"
                       rel="noopener noreferrer">
                        Visit Project
                    </a>
                </div>
            </div>

            <div className="project-screenshots">
                {project.screenshots.map((screenshot, idx) => (
                    <motion.div className="screenshot-container" key={idx} initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}} transition={{delay: 0.3 + (idx * 0.1)}}>
                        {loadingScreenshots[idx] && (
                            <motion.div className="screenshot-loading" variants={loadingVariants}
                                        animate="animate">
                                <div className="loading-pulse"></div>
                            </motion.div>
                        )}

                        <img
                            src={screenshot}
                            alt={`${project.name} screenshot ${idx + 1}`}
                            className="screenshot-image"
                            style={{
                                opacity: loadingScreenshots[idx] ? 0 : 1
                            }}
                            onLoad={() => handleImageLoad(idx)}
                            onError={() => handleImageError(idx)}
                        />
                    </motion.div>
                ))}
            </div>

            {index < PROJECT_DATA.length - 1 && <div className="project-divider"/>}
        </motion.div>
    )
}