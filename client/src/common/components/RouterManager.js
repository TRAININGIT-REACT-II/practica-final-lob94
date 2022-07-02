import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { login } from "../../actions/actionTypes";
import Home from "../../components/Home";
import PrivateRoute from "../../components/PrivateRoute";
import Login from "../../login/components/Login";
import Register from "../../login/components/Register";
import Note from "../../note/components/Note";
import MyHome from "../../notelist/components/MyHome";
import Header from "./Header";
import Modal from "./Modal";
import { useSelector } from "react-redux/es/exports";
import useBeforeRender from "../hooks/BeforeRender";
import NotFound from "./NotFound";
import ErrorBoundary from "./ErrorBoundary";
import Modify from "../../note/context/Modify";

const RouterManager = () => {

    const dispatch = useDispatch();

    const [isModify, setIsModify] = useState(false);

    //Revisar si existe otra forma en el curso
    useBeforeRender(() => {
        const isLogged = JSON.parse(localStorage.getItem("signIn"));
        if(isLogged){
            const userName = localStorage.getItem("userName");
            const token = localStorage.getItem("token");
            dispatch(login({
            userName : userName,
            isLogged : isLogged,
            token : token
            }));
        }
    }, []);

    const user = useSelector( (state)  => state);

    return(
      <Router>
        <ErrorBoundary>
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
            <PrivateRoute path="/note/:id">
              <Modify.Provider value={{isModify, setIsModify}}>
                <Note/>    
              </Modify.Provider>          
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ErrorBoundary>
      </Router>
    );
}

export default RouterManager;