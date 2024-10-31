import {Field, FieldArray, Form, Formik} from "formik";
import { Button } from "react-bootstrap";
import * as Yup from 'yup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function GlampingEditForm({ handleGlampingUpdate, glamping }) {

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters long'),

        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters long'),

        linkToBook: Yup.string()
            .required('Link to book is required')
            .url('Must be a valid URL'),

        county: Yup.string()
            .required('County is required'),

        price: Yup.number()
            .required('Price is required')
            .positive('Price must be a positive number'),

        picture: Yup.array()
            .of(Yup.string().url('Each picture must be a valid URL'))
            .required('At least one picture is required')
            .min(1, 'You must provide at least one picture')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await handleGlampingUpdate({ ...glamping, ...values });
            window.location.reload();
        } catch (error) {
            console.error("Failed to update glamping:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-4">
            <h1>Edit Glamping</h1>
            <Formik
                initialValues={{
                    name: glamping.name,
                    description: glamping.description,
                    linkToBook: glamping.linkToBook,
                    county: glamping.county,
                    price: glamping.price,
                    picture: glamping.picture || ['']
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form className={"form-group"}>
                        <div className="input-wrapper mb-3">
                            <Field className="form-control" placeholder="Name" name="name" type="text" />
                            {errors.name && touched.name ? <div>{errors.name}</div> : null}
                        </div>

                        <div className="input-wrapper mb-3">
                            <Field className="form-control" placeholder="Description" name="description" type="text" />
                            {errors.description && touched.description ? <div>{errors.description}</div> : null}
                        </div>

                        <div className="input-wrapper mb-3">
                            <Field className="form-control" placeholder="Link To Book" name="linkToBook" type="text" />
                            {errors.linkToBook && touched.linkToBook ? <div>{errors.linkToBook}</div> : null}
                        </div>

                        <div className="input-wrapper mb-3">
                            <Field className="form-control" placeholder="County" name="county" type="text" />
                            {errors.county && touched.county ? <div>{errors.county}</div> : null}
                        </div>

                        <div className="input-wrapper mb-3">
                            <Field className="form-control" placeholder="Price" name="price" type="number" />
                            {errors.price && touched.price ? <div>{errors.price}</div> : null}
                        </div>

                        <FieldArray name="picture">
                            {({ remove, push }) => (
                                <div className="input-wrapper mb-3">
                                    {values.picture.map((_, picIndex) => (
                                        <div key={picIndex} className="mb-2 d-flex align-items-center">
                                            <Field
                                                className="form-control flex-grow-1"
                                                placeholder={`Picture URL ${picIndex + 1}`}
                                                name={`picture[${picIndex}]`}
                                                type="text"
                                            />
                                            <Button
                                                variant="danger"
                                                type="button"
                                                onClick={() => remove(picIndex)}
                                                className="ml-2 m-button"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() => push("")}
                                                className="ml-2 m-button"
                                            >
                                                <FontAwesomeIcon icon={faAdd} />
                                            </Button>
                                            {errors.picture && touched.picture && errors.picture[picIndex] && touched.picture[picIndex] ? (
                                                <div className="error">{errors.picture[picIndex]}</div>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>

                        <Button variant="warning"
                                type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default GlampingEditForm;

