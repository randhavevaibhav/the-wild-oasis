import { createContext, useContext, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const showHideSideBarContex = createContext();


function ShowHideSideBarProvider({ children }) {
  const [hideSideBar, setHideSideBar] = useState(false);
 
 
 const { width } = useWindowDimensions();
  let mode = "desktop";
 if(width<1000)
 {
    mode="mobile"
  
 }
 

  function toggleHide()
  {
    setHideSideBar((hide)=>!hide);
    
  }
  return (
    <showHideSideBarContex.Provider value={{ hideSideBar,toggleHide,mode }}>{children}</showHideSideBarContex.Provider>
  );
}

function useShowHideSidebar()
{
    const contex = useContext(showHideSideBarContex);
    if(contex ===undefined) throw new Error("ResModeContext is used outside ResModeProvider !!");
    return contex;

}

export{ShowHideSideBarProvider,useShowHideSidebar}