import React from "react";
import Loader from "components/UI/Loader";
import "./Modal.scss";

const Modal = ({ setModalVisibility, children, title, loading }) => {
    return (
        <>
            <section className="modal--container" onClick={() => setModalVisibility(false)} />
            <section className="modal">
                <h1>{title}</h1>
                {loading && <Loader /> }
                {children}
            </section>
        </>
    )
}

export default Modal;