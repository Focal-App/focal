import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Page from 'components/UI/Page';
import './Login.scss';
import API_URL from 'utilities/apiEndpoint';
import Error from 'components/UI/Error';
import DataAdapter from "utilities/APIHandler/dataAdapter";

const Login = ({ apiHandler, setUser, match: { params: { uuid } } }) => {
    const [errors, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            const { data, errors } = await apiHandler.get(`/api/user/${uuid}`);
            if (data) {
                const userModel = DataAdapter.toUserModel(data)
                localStorage.setItem("user", JSON.stringify(userModel))
                setSuccess(true)
                setUser(userModel);
            } else {
                setError(errors);
            }
        }
        if (uuid) {
            fetchUser();
        }
    }, [uuid, setUser, apiHandler])

    if (success) {
        return <Redirect from="/login" to={{ pathname: "/clients" }} />
    } else {
        return (
            <Page background={'theme'} loading={success}>
                {errors && <Error message={errors} />}
                <section className='login--container'>
                    <h1>focal</h1>
                    <a className='google-btn-link' href={`${API_URL}/auth/google?scope=email%20profile`}>
                        <button className='google-btn'>Log In With Google</button>
                    </a>
                </section>
            </Page>
        )
    }
}

export default Login;