import "./styles.sass";
import BackCard from "@/common/components/BackCard";
import Project from "@/pages/Projects/components/Project";
import MySpeedIcon from "@/common/images/apps/myspeed.png";
import ARIcon from "@/common/images/apps/autoresponder.png";
import SQLIcon from "@/common/images/apps/sqltoolkit.png";
import MCIcon from "@/common/images/apps/mcdash.png";
import LicenseIcon from "@/common/images/apps/licenseapi.png";
import SheepstarIcon from "@/common/images/apps/sheepstar.png";
import SierraIcon from "@/common/images/apps/sierra.png";
import BFSIcon from "@/common/images/apps/bfs2of.png";
import PerfectMarketIcon from "@/common/images/apps/pmg.png";
import PowerToolsIcon from "@/common/images/apps/powertools.png";
import Contributed from "@/pages/Projects/components/Contributed";

const projects = [
    {
        name: "Perfect Market Game",
        description: "Lerne spielerisch den vollkommenen Markt in deiner Klasse kennen und lass deine Mitschüler" +
            " im Wettbewerb gegeneinander antreten. Geeignet für den Unterricht in BWR/R. ",
        link: "https://pmg.gnmyt.dev/",
        icon: PerfectMarketIcon,
        label: "Neu",
    },
    {
        name: "PowerTools",
        description: "PowerTools bietet dir verschiedene Tools um deinen Alltag zu erleichtern. " +
            "Dazu gehört beispielsweise ein Passwort-Generator, ein QR-Code-Generator und mehr. ",
        link: "https://tools.gnmyt.dev/",
        icon: PowerToolsIcon,
    },
    {
        name: "MySpeed",
        description: "MySpeed hilft dir, den Überblick über dein Internet zu behalten. Erstelle automatisierte Speedtests " +
            "und lasse dir alle in einer Liste anzeigen.",
        link: "https://myspeed.gnmyt.dev/",
        icon: MySpeedIcon
    },
    {
        name: "AutoResponder-Integration",
        description: "Eine Java-Wrapper-Bibliothek, mit der du deine eigene Logik in deinen Whatsapp-Bot implementieren kannst. " +
            "Basiert auf der AutoResponder-App aus dem Play Store.",
        link: "https://github.com/gnmyt/AutoResponder-Integration",
        icon: ARIcon
    },
    {
        name: "SQL Toolkit",
        description: "Eine Java-Wrapper-Bibliothek, mit der du die Verwaltung von einer Datenbank vereinfachen kannst. " +
            "Die Software generiert SQL-Statements, sodass du das nicht mehr musst.",
        link: "https://github.com/gnmyt/sqltoolkit",
        icon: SQLIcon
    },
    {
        name: "MCDash",
        description: "Eine kostenlose Verwaltungs-Software für Spigot & Bungeecord-Server. " +
            "Die Software bietet ein umfangreiches Dashboard für das Verwalten von Plugins, Spielern und mehr.",
        link: "https://mcdash.gnmyt.dev/",
        icon: MCIcon
    },
    {
        name: "Minecraft Plugins",
        description: "Auf meinem Spigot-Profil findest du weitere Plugins, welche Ich erstellt habe. " +
            "Dazu gehört beispielsweise RandSystem oder SimpleMaintenance.",
        link: "https://www.spigotmc.org/resources/authors/gnmyt.589670/",
        icon: "https://static.spigotmc.org/img/spigot.png"
    }
]

const contributed = [
    {
        name: "LicenseAPI",
        description: "Die perfekte Lösung, Projekte ohne großen Aufwand zu lizenzieren.",
        link: "https://github.com/LicenseAPI",
        icon: LicenseIcon
    },
    {
        name: "Sheepstar",
        description: "Der modulare Discord Bot, der deinen Discord Server einzigartig macht.",
        link: "https://sheepstar.xyz/",
        icon: SheepstarIcon
    },
    {
        name: "SierraDevoplers",
        description: "Ein Team mit viel Kreativität. Leitet unter anderem Projekte wie den Störungsmelder oder MC-Leben",
        link: "https://sierra-dev.de/",
        icon: SierraIcon
    },
    {
        name: "BFS2OF",
        description: "Eine Gruppenarbeit innerhalb der Berufsschule. " +
            "Wir haben eine Website erstellt, welche Quizzes innerhalb einer Klasse ermöglicht.",
        link: "https://github.com/BFS2OF",
        icon: BFSIcon
    },
]

export const Projects = () => (
    <div className="page-wrapper">
        <BackCard currentPage="Projekte"/>
        <div className="project-wrapper">
            {projects.map(project => <Project {...project} key={project.name} />)}
        </div>
        <h3 className="project-page-text">Mitgewirkt bei</h3>
        <div className="contributed-wrapper">
            {contributed.map(contributed => <Contributed {...contributed} key={contributed.name} />)}
        </div>
    </div>
)