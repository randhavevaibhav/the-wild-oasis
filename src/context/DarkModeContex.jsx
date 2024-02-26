import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContex = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(()=>{

    if(isDarkMode)
    {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");

    }else{
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
    }
  },[isDarkMode])

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }
  return (
    <DarkModeContex.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContex.Provider>
  );
}

function useDarkMode()
{
    const contex = useContext(DarkModeContex);
    if(contex ===undefined) throw new Error("DarkModeContext is used outside DarkModeProvider !!");
    return contex;

}

export{DarkModeProvider,useDarkMode}