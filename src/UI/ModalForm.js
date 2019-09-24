import React from "react";
import FormContainer from "UI/FormContainer";
import Modal from "UI/Modal";
import Success from "UI/Success";
import Error from "UI/Error";

const ModalForm = ({ isLoading, isVisible, setModalVisibility, errors, success, children }) => {
    return (
        <Modal isLoading={isLoading} setModalVisibility={setModalVisibility} isVisible={isVisible} title="">
            <FormContainer>
                {errors && <Error message={errors} />}
                {success
                    ? <Success text="Success!" />
                    : children
                }
            </FormContainer>
        </Modal>
    )
}

export default ModalForm;