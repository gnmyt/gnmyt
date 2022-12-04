import "@/common/styles/main.sass";
import "@/common/styles/_fonts.sass";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const App = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    </>
);

export default App;