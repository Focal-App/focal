import React, { useState } from 'react';
import './Header.scss';
import Endpoints from "utilities/api/apiEndpoint";

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

    const logOut = async() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        await apiHandler.get(Endpoints.logout);
        setUser(null)
    }

    if (!user) {
        return null;
    }

    const userAvatar = user.avatar || require('assets/avatar-placeholder.png');

    return (
        <BasicHeader>
            <a href="/clients/new">New Client</a>
            <a href="/clients">Clients</a>
            <div className='avatar'>
                <img className='avatar-img' alt="avatar" src={userAvatar} onClick={() => toggleDropdown(!dropdownVisible)} />
                {
                    dropdownVisible
                    && <div className='dropdown'>
                        <button className='btn--tertiary' onClick={logOut}>Log Out</button>
                    </div>
                }
            </div>
        </BasicHeader>
    )
}

export default AuthenticatedHeader;