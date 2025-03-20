import "./styles.sass";
import {motion, AnimatePresence} from "framer-motion";
import {useState, useEffect} from "react";
import {PROJECT_DATA} from "@/pages/Projects/Projects.jsx";
import ScreenshotDialog from "@/pages/Projects/components/ProjectItem/components/index.js";

export const ProjectItem = ({project, index}) => {
    const [loadingScreenshots, setLoadingScreenshots] = useState(project.screenshots ?
        new Array(project.screenshots.length).fill(true) : []);
    const [loadedImages, setLoadedImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const loadProjectImages = async () => {
            try {
                let images = [];

                if (project.screenshots && project.screenshots.length > 0) {
                    const imagePromises = project.screenshots.map(importFunc => importFunc());
                    const importedImages = await Promise.all(imagePromises);
                    images = importedImages.map(module => module.default);
                }

                setLoadedImages(images);
            } catch (error) {
                console.error(`Error loading images for ${project.name}:`, error);
                setLoadedImages([]);
            }
        };

        loadProjectImages();
    }, [project.name, project.screenshots]);

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

    const handleScreenshotClick = (image, alt) => setSelectedImage({image, alt});
    const handleCloseDialog = () => setSelectedImage(null);

    return (
        <>
            <motion.div key={project.name} className="project-item" variants={itemVariants}>
                <div className="project-header">
                    <div className="project-logo-container">
                        <img src={project.logo} alt={`${project.name} logo`} className="project-logo"/>
                    </div>

                    <div className="project-info">
                        <div className="project-title-row">
                            <div className="title-group">
                                <h2 className="project-title">{project.name}</h2>
                                <p className="project-year">{project.year}</p>
                            </div>
                            <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                                Visit Project
                            </a>
                        </div>
                        <p className="project-description">{project.description}</p>

                        <div className="project-technologies">
                            {project.technologies.map(tech => (<span key={tech} className="tech-tag">{tech}</span>))}
                        </div>
                    </div>
                </div>

                <div className="project-screenshots">
                    {loadedImages.length > 0 ?
                        loadedImages.map((screenshot, idx) => (
                            <motion.div className="screenshot-container" key={idx} initial={{opacity: 0, y: 20}}
                                        onClick={() => handleScreenshotClick(screenshot, `${project.name} screenshot ${idx + 1}`)}
                                        animate={{opacity: 1, y: 0}} transition={{delay: 0.3 + (idx * 0.1)}}
                            >
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
                                        opacity: loadingScreenshots[idx] ? 0 : 1,
                                        cursor: 'pointer'
                                    }}
                                    onLoad={() => handleImageLoad(idx)}
                                    onError={() => handleImageError(idx)}
                                />
                            </motion.div>
                        ))
                        : project.screenshots && project.screenshots.length > 0 ?
                            new Array(project.screenshots.length).fill(0).map((_, idx) => (
                                <motion.div className="screenshot-container" key={idx} initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}} transition={{delay: 0.3 + (idx * 0.1)}}>
                                    <motion.div className="screenshot-loading" variants={loadingVariants}
                                                animate="animate">
                                        <div className="loading-pulse"></div>
                                    </motion.div>
                                </motion.div>
                            ))
                            : null}
                </div>

                {index < PROJECT_DATA.length - 1 && <div className="project-divider"/>}
            </motion.div>

            <AnimatePresence mode="wait">
                {selectedImage && (
                    <ScreenshotDialog
                        isOpen={true}
                        onClose={handleCloseDialog}
                        image={selectedImage.image}
                        alt={selectedImage.alt}
                    />
                )}
            </AnimatePresence>
        </>
    )
}