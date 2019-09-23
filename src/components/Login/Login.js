import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Page from 'UI/Page';
import './Login.scss';
import Error from 'UI/Error';
import DataAdapter from "utilities/api/dataAdapter";
import Endpoints from "utilities/api/apiEndpoint";

const Login = ({ apiHandler, setUser, match: { params: { uuid } } }) => {
    const [errors, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            const { data, errors } = await apiHandler.get(Endpoints.getUser(uuid));
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
                    <a className='google-btn-link' href={Endpoints.googleLogin}>
                        <button className='google-btn'>Log In With Google</button>
                    </a>
                </section>
            </Page>
        )
    }
}

export default Login;