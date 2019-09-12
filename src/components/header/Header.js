import React, { useState } from 'react';
import './Header.scss';

const BasicHeader = (props) => (
    <header className="header--container">
        <section className='header'>
            <a className='logo' href="/">focal</a>
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
        await apiHandler.get(`/auth/signout`);
        setUser(null)
    }

    if (!user) {
        return null;
    }

    const userAvatar = user.avatar || require('assets/avatar-placeholder.png');

    return (
        <BasicHeader>
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