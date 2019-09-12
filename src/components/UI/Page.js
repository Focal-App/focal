import React from 'react';
import './Page.scss';
import Loader from 'components/UI/Loader';

const Page = ({ background, children, loading }) => (
    <>
        <main className={`page page--${background}`}>
            {loading ? <Loader /> : children }
        </main>
    </>
)

export default Page;