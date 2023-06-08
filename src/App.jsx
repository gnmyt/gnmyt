import "@/common/styles/main.sass";
import "@/common/styles/_fonts.sass";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Privacy from "@/pages/Privacy";
import Imprint from "@/pages/Imprint";

export const App = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/imprint" element={<Imprint />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    </>
);

export default App;