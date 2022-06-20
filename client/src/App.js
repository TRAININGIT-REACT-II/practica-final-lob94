import Login from "./login/components/Login";
import Register from "./login/components/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./common/components/Header";
import THEMES from "./utils/THEMES";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import User from "./common/context/User";
import Theme from "./common/context/Theme";
import MyHome from './notelist/components/MyHome';
import { createStore } from "redux";
import userReducer from "./reducers/userReducer";
import { Provider } from "react-redux";
import Note from "./note/components/Note";

// Componente principal de la aplicación.
const App = () => {
  
  const [theme, setTheme] = useState(THEMES.light);
  const [signIn, setSignIn] = useState(() => {
    const signIn = localStorage.getItem("signIn");
    const value = JSON.parse(signIn);
    return value || false;
  });
  const [userName, setUserName] = useState(() => {
    const userName = localStorage.getItem("userName");
    return userName || "";
  });

  const store = createStore(userReducer);

  useEffect(() => {
    if(theme === THEMES.dark){
      document.body.className = "dark";
    }else{
      document.body.className = "light";
    }
  }, [theme]);
  
  
  return(
    <Provider store={store}>
      <User.Provider value={{ signIn, setSignIn, userName, setUserName}}>
        <Theme.Provider value={{theme, setTheme}}>
          <Router>
            <Header/>
            <Switch>
              <Route path="/" exact>
                <Home/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/signup">
                <Register/>
              </Route>
              <PrivateRoute path="/home">
                <MyHome/>
              </PrivateRoute>
              <PrivateRoute path="/create-note">
                <Note/>              
              </PrivateRoute>
            </Switch>
          </Router>
        </Theme.Provider>
      </User.Provider>
    </Provider>
)};

export default App;
