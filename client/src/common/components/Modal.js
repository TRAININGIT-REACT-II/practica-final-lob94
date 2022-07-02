import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Theme from "../context/Theme";
import '../css/Modal.css';

const Modal = ({children, show, onClose}) => {

    const modalRef = useRef(null);

    const modalGroupRef = useRef(document.getElementById("modal"));

    const {theme, setTheme} = useContext(Theme);

    useEffect(() => {
        const modalEl = document.createElement("div");
        modalEl.classList.add("modal-hidden");

        modalGroupRef.current.appendChild(modalEl);

        modalRef.current = modalEl;

        return () => modalGroupRef.current.removeChild(modalRef.current);
    }, []);

    useEffect(() => {
        if(modalRef.current != null){
            if(show){
                modalRef.current.classList.remove("modal-hidden");
            }else{
                modalRef.current.classList.add("modal-hidden");
            }
        }
    }, [show])

    if (show && modalRef.current != null) {
        return createPortal(
            <div role="dialog" aria-modal="true" >
                <div className="modal-background" onClick={onClose}/>
                <div className={theme ? "modal-dark" : "modal"}>
                    <button
                        className={theme ? "modal-close-dark" : "modal-close outline"}
                        aria-label="Cerrar modal"
                        onClick={onClose}>
                            &times;
                    </button>
                    {children}
                </div>
            </div>,
            modalRef.current
        );
    } else {
        // No renderizamos nada si no hace falta
        return null;
    }

};

export default Modal;