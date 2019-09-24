import React, { useState } from 'react';
import './Header.scss';
import Endpoints from "utilities/api/apiEndpoint";
import Loader from 'UI/Loader';
import Error from "UI/Error";

const BasicHeader = (props) => (
    <header className="header--container">
        <section className='header'>
            <a className='logo' href="/clients">focal</a>
            <section className='navigation'>
                {props.children}
            </section>
        </section>
    </header>
)

const AuthenticatedHeader = ({ user, setUser, apiHandler }) => {
    const [dropdownVisible, toggleDropdown] = useState(false)
    const [loading, setLoader] = useState(false);
    const [errors, setErrors] = useState(false);

    const logOut = async () => {
        setLoader(true);
        const { data, errors } = await apiHandler.get(Endpoints.logout);
        setLoader(false);
        if (data) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null)
        } else {
            setErrors(errors)
        }
    }

    if (!user) {
        return null;
    }

    const userAvatar = user.avatar || require('assets/avatar-placeholder.png');

    return (
        <BasicHeader>
            <a href="/clients/new">New Client</a>
            <a href="/clients">Clients</a>
            {
                loading
                    ? <Loader size="small" />
                    : (
                        <div className='avatar'>
                            <img className='avatar-img' alt="avatar" src={userAvatar} onClick={() => toggleDropdown(!dropdownVisible)} />
                            {
                                dropdownVisible
                                && <div className='dropdown'>
                                    <button className='btn--tertiary' onClick={logOut}>Log Out</button>
                                </div>
                            }
                        </div>
                    )
            }
            { errors && (
                <div className="header-error">
                    <Error message={errors} />
                </div>
            )}
        </BasicHeader>
    )
}

export default AuthenticatedHeader;