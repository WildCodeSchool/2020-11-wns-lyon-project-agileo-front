import React from 'react';

const PreferencesContext = React.createContext({
    rtl: 'left',
    theme: 'light',
    toggleTheme: () => {},
    toggleRTL: () => {},
});

export default PreferencesContext;