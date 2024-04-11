import React, { createContext, useState, useContext } from 'react';
const ReloadContext = createContext();

export const ReloadProvider = ({ children }) => {
    const [reload, setReload ] = useState(false);

    return (
        <ReloadContext.Provider value = {{ reload, setReload }}>
            { children }
        </ReloadContext.Provider>
    )
}

export const useReload = () => useContext(ReloadContext);