import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import {createBrowserRouter, RouterProvider} from "react-router";
import {Home} from "@/pages/Home/Home.jsx";
import Imprint from "@/pages/Imprint";
import PrivacyPolicy from "@/pages/Privacy";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/projects", element: <Projects />},
            {path: "/contact", element: <Contact />},
            {path: "/imprint", element: <Imprint />},
            {path: "/privacy", element: <PrivacyPolicy />}
        ]
    }
]);

root.render(<RouterProvider router={router}/>);