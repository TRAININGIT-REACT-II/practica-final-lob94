import { Fragment, useContext, useEffect, useState} from "react";
import "../../common/css/CommonCSS.css";
import "../css/Note.css";
import Theme from "../../common/context/Theme";
import useApi from "../../common/hooks/useApi";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import NoteButtons from "./NoteButtons";
import Modify from "../context/Modify";
import useBeforeRender from "../../common/hooks/BeforeRender";

const Note = () => {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const {isModify, setIsModify} = useContext(Modify);

    const {theme, setTheme} = useContext(Theme);

    const request = useApi("/notes", "", {}, false);

    const user = useSelector((state) => state);

    const requestConsulta = useApi("/notes/" + id, "", {}, false);;

    const updateTitle = (e) => {
        const {value} = e.target;
        setTitle(value);
    };

    const updateBody = (e) => {
        const {value} = e.target;
        setBody(value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(id){
            request.updateParams({
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Api-Token": user.token
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: body.trim(),
                })
            });
            request.perform();
        }else{
            request.updateParams({
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Api-Token": user.token
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: body.trim(),
                })
            });
            request.perform();
        }
    }

    useEffect(() => {
        if(request.data != null){
            history.push("/home");
        }
    }, [request.data]);

    useBeforeRender(()=> {
        if(id){

            requestConsulta.updateParams({
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Api-Token": user.token
                }
            });
            requestConsulta.perform();
        }else{
            setIsModify(true);
        }
    }, [])

    useEffect(() => {
       
    }, []);

    useEffect(() => {
        if(requestConsulta.data != null){
            setTitle(requestConsulta.data.title);
            setBody(requestConsulta.data.content);
        }
    }, [requestConsulta.data]);
    

    return (
        <section className={theme ? "body-dark" : "body"}>
        {id ? <h1>Modificar nota</h1> : <h1>Crear nota</h1>}
        <NoteButtons id={id}/>
        <form onSubmit={onSubmit}>
            <div className="row rowForm">
                <div>
                    {!isModify ?
                        <input id="title" type="text" className={theme ? "input-text-dark" : "input"} onChange={updateTitle} readOnly={true} value={title} maxlength="60"></input>
                        :<input id="title" type="text" className={theme ? "input-text-dark" : "input"} onChange={updateTitle} value={title} placeholder="Título" maxlength="60"></input>
                    }
                </div>
                {false ?
                    <span className="formError">error</span>
                    : <Fragment/>
                }
            </div>
            <div className="row rowForm">
                <div >
                    {!isModify ?
                        <textarea id="body" rows="10" className={theme ? "input-text-dark" : "input"} onChange={updateBody} readOnly={true} value={body} maxlength="1000"></textarea>
                        :<textarea id="body" rows="10" className={theme ? "input-text-dark" : "input"} onChange={updateBody} value={body} placeholder="Cuerpo ..." maxlength="1000"></textarea>
                    }
                </div>
                {false ?
                    <span className="formError">error</span>
                    : <Fragment/>
                }
            </div>

            <div className="row">
                    <button className={theme ? "button-dark" : "button-light"} type="submit">{id ? "Modificar nota" : "Crear nota"}</button>
            </div>
        </form>
    </section> 
    );

};

export default Note;