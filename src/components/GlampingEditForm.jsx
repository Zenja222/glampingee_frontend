import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from 'yup';

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

                        <div className="input-wrapper mb-3">
                            <label>Pictures</label>
                            {values.picture.map((pic, index) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    <Field
                                        className="form-control"
                                        placeholder={`Picture URL ${index + 1}`}
                                        name={`picture[${index}]`}
                                        type="text"
                                    />
                                    {errors.picture && touched.picture && errors.picture[index] && touched.picture[index] ? (
                                        <div>{errors.picture[index]}</div>
                                    ) : null}
                                </div>
                            ))}

                            <Button
                                type="button"
                                onClick={() => {
                                    setFieldValue('picture', [...values.picture, '']);
                                }}
                            >
                                Add Picture
                            </Button>
                            <Button
                                onClick={() => {
                                    if (values.picture.length > 1) {
                                        setFieldValue('picture', values.picture.slice(0, -1));
                                    }
                                }}
                            >
                                Delete Picture
                            </Button>
                        </div>

                        <Button type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default GlampingEditForm;

