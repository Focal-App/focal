import React, { useState } from "react";
import NewClientForm from "./NewClientForm";
import { Redirect } from 'react-router';
import Page from "UI/Page";
import FormContainer from "UI/FormContainer";
import Error from "UI/Error";
import Endpoints from "utilities/api/apiEndpoint";
import Success from "UI/Success";

const NewClient = ({ apiHandler }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const [errors, setErrors] = useState(false);

    const onSubmit = async (values) => {
        setLoading(true)
        const newClientData = { contacts: [values], private_notes: values.private_notes };
        const { data, errors } = await apiHandler.post(Endpoints.newClient, newClientData);
        setLoading(false)
        if (data) {
            setSuccess(true)
            setTimeout(() => { setRedirect(true) }, 1200)
        } else {
            setErrors(errors)
        }
    }

    if (success && redirect) {
        return <Redirect from="/clients/new" to={{ pathname: "/clients" }} />
    }
    return (
        <Page loading={loading}>
            <h1>New Client</h1>
            {errors && <Error message={errors} />}
            <FormContainer>
                {success
                    ? <Success text="Success!" />
                    : <NewClientForm onSubmit={onSubmit} />
                }
            </FormContainer>
        </Page>
    )
}

export default NewClient;