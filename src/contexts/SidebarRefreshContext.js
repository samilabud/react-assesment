import React, { createContext, useState } from "react";

export const SidebarRefreshContext = createContext();

export const SidebarRefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <SidebarRefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </SidebarRefreshContext.Provider>
  );
};
