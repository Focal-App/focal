import React from "react";
import Page from "components/UI/Page";

const ClientPage = ({ loading, children }) => (
    <Page loading={loading} >
        <section className='client--container'>
            {children}
        </section>
    </Page>
)

export default ClientPage;