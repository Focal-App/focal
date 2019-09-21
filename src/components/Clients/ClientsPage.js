import React from "react";
import Page from "UI/Page";

const ClientsPage = ({ loading, children }) => (
    <Page loading={loading} >
        <section className='clients--container'>
            <h1>Clients</h1>
            {children}
        </section>
    </Page>
)

export default ClientsPage;