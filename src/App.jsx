import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import "@/common/styles/main.sass";
import Navigation from "@/common/components/Navigation";
import Footer from "@/common/components/Footer";
import {Outlet} from "react-router";

export default () => (
    <>
        <Navigation/>
        <Outlet/>
        <Footer/>
    </>
);