import React from "react";
import Page from "UI/Page";

const ClientPage = ({ loading, children }) => (
    <Page loading={loading} >
        <section className='client--container'>
            {children}
        </section>
    </Page>
)

export default ClientPage;