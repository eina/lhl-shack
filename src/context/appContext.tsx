import React from "react";

export const AppContext = React.createContext<any>({});

export const { Provider: AppContextProvider } = AppContext;
