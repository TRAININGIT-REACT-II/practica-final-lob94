import { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Theme from "../../common/context/Theme";
import "../../common/css/CommonCSS.css";
import useApi from "../../common/hooks/useApi";
import Modify from "../context/Modify";
import { useSelector } from "react-redux/es/exports";
import Modal from "../../common/components/Modal";

const NoteButtons = (props) => {
    const {theme, setTheme} = useContext(Theme);

    const {id, isModify, setIsModify, setApiError, setError} = props;

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const history = useHistory();

    const user = useSelector((state) => state);

    const request = useApi("/notes/" + id, "", {}, false);

    const changeModified = () => {
        setIsModify(!isModify);
    };

    const deleteNote = () => {
        request.updateParams({
            method: "DELETE",
            headers: {
                "Api-Token": user.token
            }
        });
        request.perform();
    };

    useEffect(() => {

        if(request.data){
            history.push("/home");
        }

    }, [request.data]);

    useEffect(() => {
        if(request.error != null){
            setApiError(true);
            setError(request.error);
        }
    }, [request.error]);

    return (
        <Fragment>
            {id ?
                <div>
                    <button className={theme ? "button-dark" : "button-light"} onClick={changeModified}>{!isModify ? "Actualizar" : "Lectura"}</button> 
                    <button className="button-red" onClick={openModal}>Borrar nota</button>
                    <Modal show={showModal} onClose={closeModal}>
                        <h3>¿Quiere borrarla?</h3>
                        <button className="button-red" onClick={closeModal}>Cancelar</button> 
                        <button className={theme ? "button-dark" : "button-light"} onClick={deleteNote}>Confirmar</button>
                    </Modal>
                </div>
                : <Fragment/>
            }
        </Fragment>
    );

}

export default NoteButtons;