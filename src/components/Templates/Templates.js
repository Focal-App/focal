import React, {useState} from 'react';
import Page from 'UI/Page';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FieldWithError } from "UI/FormParts";

const TemplateSchema = Yup.object().shape({
    template_name: Yup.string()
})

const Templates = ({ apiHandler }) => {
    const [showNewTemplate, setShowNewTemplate] = useState(false);
    
    return (
        <Page>
            <div>
                <h1>Templates</h1>
                <div>
                    <h2>Emails</h2>

                    <div>
                        <h3>No templates yet!</h3>
                        <p>Create a new template by clicking the button below.</p>
                    </div>

                    <button data-testid="new-template-btn" onClick={() => setShowNewTemplate(!showNewTemplate)}>New Template</button>
                </div>
           
                { showNewTemplate && <Formik
                    initialValues={{template_name: ''}}
                    validationSchema={TemplateSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                    render={({

                    }) => (
                        <Form>
                            <FieldWithError label={`Name`} name={'template_name'} type="text"/>
                        </Form>
                    )}
                />}
            </div>
        </Page>
    )
}

export default Templates;
