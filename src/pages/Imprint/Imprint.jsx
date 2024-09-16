import "./styles.sass";
import BackCard from "@/common/components/BackCard";

export const Imprint = () => (
    <div className="page-wrapper">
        <BackCard currentPage="Impressum"/>
        <div className="imprint-wrapper">
            <h2>Angaben gem&auml;&szlig; &sect; 5 DDG</h2>
            <p>Mathias Wagner<br />
                c/o COCENTER<br />
                Koppoldstr. 1<br />
                86551 Aichach</p>

            <h2>Kontakt</h2>
            <p>E-Mail: mathias@gnmyt.dev</p>

            <p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p>
        </div>
    </div>
);