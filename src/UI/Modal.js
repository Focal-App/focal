import React from "react";
import Loader from "UI/Loader";
import "./Modal.scss";

const Modal = ({ setModalVisibility, children, title, isLoading, isVisible }) => {
    if (isVisible) {
        return (
            <>
                <section className="modal--container" onClick={() => setModalVisibility(false)} />
                <section className="modal">
                    <h1>{title}</h1>
                    {isLoading 
                        ? <Loader /> 
                        : children
                    }
                </section>
            </>
        )
    } else {
        return null;
    }
    
}

export default Modal;