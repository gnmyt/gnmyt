import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import {createBrowserRouter, RouterProvider} from "react-router";
import {Home} from "@/pages/Home/Home.jsx";

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Home/>,},
            {path: "/projects", element: <div>Projects</div>},
            {path: "/contact", element: <div>Contact</div>}
        ]
    }
]);

root.render(<RouterProvider router={router}/>);