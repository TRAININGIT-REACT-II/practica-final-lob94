
import THEMES from "./utils/THEMES";
import { useEffect, useState } from "react";
import Theme from "./common/context/Theme";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import RouterManager from "./common/components/RouterManager";

// Componente principal de la aplicación.
const App = () => {
  
  const [theme, setTheme] = useState(THEMES.light);

  useEffect(() => {
    if(theme === THEMES.dark){
      document.body.className = "dark";
    }else{
      document.body.className = "light";
    }
  }, [theme]);
  
  
  return(
    <Provider store={store}>
        <Theme.Provider value={{theme, setTheme}}>
          <RouterManager/>
        </Theme.Provider>
    </Provider>
)};

export default App;
