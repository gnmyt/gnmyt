import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import "@/common/styles/main.sass";
import Navigation from "@/common/components/Navigation";
import Footer from "@/common/components/Footer";
import Background from "@/common/components/Background";
import Cursor from "@/common/components/Cursor";
import {BackgroundProvider} from "@/common/components/Background/BackgroundContext";
import {Outlet} from "react-router";

export default () => (
    <BackgroundProvider>
        <Cursor/>
        <Background/>
        <Navigation/>
        <Outlet/>
        <Footer/>
    </BackgroundProvider>
);