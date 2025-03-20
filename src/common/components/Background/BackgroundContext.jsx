import {createContext, useContext, useState} from "react";

const BackgroundContext = createContext(null);

export const BackgroundProvider = ({children}) => {
    const [circles, setCircles] = useState([]);

    return (
        <BackgroundContext.Provider value={{circles, setCircles}}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context) {
        throw new Error('useBackground must be used within a BackgroundProvider');
    }
    return context;
};