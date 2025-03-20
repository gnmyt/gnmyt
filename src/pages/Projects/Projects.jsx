import {useEffect} from "react";
import {motion} from "framer-motion";
import {useBackground} from "@/common/components/Background/BackgroundContext";
import "./styles.sass";

import DualbootManagerImage from "@/common/images/projects/DualbootManager.png";
import LicenseAPIImage from "@/common/images/projects/LicenseAPI.png";
import MCDashImage from "@/common/images/projects/MCDash.png";
import MySpeedImage from "@/common/images/projects/MySpeed.png";
import NextermImage from "@/common/images/projects/Nexterm.png";
import QuizzleImage from "@/common/images/projects/Quizzle.png";
import ProjectItem from "@/pages/Projects/components/ProjectItem";

export const PROJECT_DATA = [
    {
        name: "Nexterm",
        logo: NextermImage,
        link: "https://nexterm.dev",
        description: "The open source server management software for SSH, VNC & RDP. Manage your servers with ease and security.",
        technologies: ["Node.js", "React", "Guacamole"],
        year: "2024",
        screenshots: [
            () => import('@/pages/Projects/screenshots/nexterm/1.png'),
            () => import('@/pages/Projects/screenshots/nexterm/2.png'),
            () => import('@/pages/Projects/screenshots/nexterm/3.png')
        ]
    },
    {
        name: "MySpeed",
        logo: MySpeedImage,
        link: "https://myspeed.dev/",
        description: "An internet speed testing tool with historical tracking. Provides detailed metrics on download/upload speeds and latency with beautiful visualizations.",
        technologies: ["Node.js", "React", "Chart.js", "Ookla", "Cloudflare Speed", "LibreSpeed"],
        year: "2022",
        screenshots: [
            () => import('@/pages/Projects/screenshots/myspeed/1.png'),
            () => import('@/pages/Projects/screenshots/myspeed/2.png'),
            () => import('@/pages/Projects/screenshots/myspeed/3.png')
        ]
    },
    {
        name: "LicenseAPI",
        logo: LicenseAPIImage,
        link: "https://licenseapi.gnm.dev/",
        description: "A robust API for software license management. Handles license creation, validation, and activation with secure endpoints and comprehensive documentation.",
        technologies: ["Node.js", "MongoDB", "TypeScript"],
        year: "2024",
        screenshots: [
            () => import('@/pages/Projects/screenshots/licenseapi/1.png'),
            () => import('@/pages/Projects/screenshots/licenseapi/2.png'),
            () => import('@/pages/Projects/screenshots/licenseapi/3.png')
        ]
    },
    {
        name: "MCDash",
        logo: MCDashImage,
        link: "https://mcdash.gnm.dev",
        description: "A comprehensive dashboard for Minecraft server management. Monitor performance, manage players, and control server settings through a modern web interface.",
        technologies: ["React", "WebSockets", "Java API", "Minecraft APIs"],
        year: "2021",
        screenshots: [
            () => import('@/pages/Projects/screenshots/mcdash/1.png'),
            () => import('@/pages/Projects/screenshots/mcdash/2.png'),
            () => import('@/pages/Projects/screenshots/mcdash/3.png')
        ]
    },
    {
        name: "Dualboot Manager",
        logo: DualbootManagerImage,
        link: "https://dualboot.gnm.dev/",
        description: "Make the installation and configuration of the CLOVER bootloader possible with just a few clicks.",
        technologies: ["React", "Electron", "Node.js"],
        year: "2024",
        screenshots: [
            () => import('@/pages/Projects/screenshots/dualboot/1.png'),
            () => import('@/pages/Projects/screenshots/dualboot/2.png'),
            () => import('@/pages/Projects/screenshots/dualboot/3.png')
        ]
    },
    {
        name: "Quizzle",
        logo: QuizzleImage,
        link: "https://github.com/gnmyt/Quizzle",
        description: "An interactive quiz platform for educational purposes. Create, share, and participate in quizzes with real-time scoring and leaderboards.",
        technologies: ["Node.js", "React", "Socket.IO"],
        year: "2024",
        screenshots: [
            () => import('@/pages/Projects/screenshots/quizzle/1.png'),
            () => import('@/pages/Projects/screenshots/quizzle/2.png'),
            () => import('@/pages/Projects/screenshots/quizzle/3.png')
        ]
    }
];

export const Projects = () => {
    const {setCircles} = useBackground();

    useEffect(() => {
        setCircles([
            {bottom: '-10rem', right: '-20rem', size: '35rem', opacity: 0.3},
            {top: '15rem', left: '-15rem', size: '25rem', opacity: 0.2}
        ]);

        return () => setCircles([]);
    }, [setCircles]);

    const containerVariants = {hidden: {opacity: 0}, visible: {opacity: 1, transition: {staggerChildren: 0.2}}};

    return (
        <div className="projects-page">
            <motion.h1 className="page-title" initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}
                       transition={{duration: 0.5}}>
                My Projects
            </motion.h1>

            <motion.p className="page-subtitle" initial={{opacity: 0}} animate={{opacity: 1}}
                      transition={{duration: 0.5, delay: 0.2}}>
                A selection of my recent projects and creations.
            </motion.p>

            <motion.div className="projects-list" variants={containerVariants} initial="hidden" animate="visible">
                {PROJECT_DATA.map((project, index) => (<ProjectItem key={index} index={index} project={project}/>))}
            </motion.div>
        </div>
    );
};