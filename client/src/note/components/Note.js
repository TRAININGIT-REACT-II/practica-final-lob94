import { Fragment, useContext, useEffect, useState} from "react";
import "../../common/css/CommonCSS.css";
import Theme from "../../common/context/Theme";
import useApi from "../../common/hooks/useApi";

const Note = ({object}) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const {theme, setTheme} = useContext(Theme);

    const request = useApi("/api/notes", "", {}, false);

    if(object && object.id){
        const requestConsulta = useApi("/api/notes/" + object.id, "", {}, false);
    }

    const updateTitle = (e) => {
        const {value} = e.target;
        setTitle(value);
    }

    const updateBody = (e) => {
        const {value} = e.target;
        setBody(value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(object && object.id){
            request.updateParams({
                method: "PUT",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({
                    title: title.trim(),
                    content: body.trim(),

                })
            });
            request.perform();
        }else{
            request.updateParams({
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({
                    title: title.trim(),
                    content: body.trim(),

                })
            });
            request.perform();
        }
    }

    const getNote = () => {

    }

    useEffect(() => {
        if(object && object.id){
            requestConsulta.updateParams({
                method: "GET"
            });
            requestConsulta.perform();
        }
    }, [object]);
    

    return (
        <section className={theme ? "body-dark" : "body"}>
        {object && object.id ? <h1>Modificar nota</h1> : <h1>Crear nota</h1>}
        <form onSubmit={onSubmit}>
            <div className="row rowForm">
                <div className="col20">
                    <span >Título: </span>
                </div>
                <div className="col80">
                    <input id="title" type="text" className={theme ? "input-text-dark" : "input"} onChange={updateTitle}></input>
                </div>
                {false ?
                    <span className="formError">error</span>
                    : <Fragment/>
                }
            </div>
            <div className="row rowForm">
                <div className="col20">
                    <span >Cuerpo: </span>
                </div>
                <div className="col80">
                    <input id="body" type="text" className={theme ? "input-text-dark" : "input"} onChange={updateBody}></input>
                </div>
                {false ?
                    <span className="formError">error</span>
                    : <Fragment/>
                }
            </div>

            {object && object.id ?
                <div>
                    <p>Autor: {}</p>
                </div>
                :
                <Fragment/>
            }

            <div className="row">
                    <button className={theme ? "button-dark" : "button-light"} type="submit">{object && object.id ? "Modificar nota" : "Crear nota"}</button>
            </div>
        </form>
    </section> 
    );

};

export default Note;