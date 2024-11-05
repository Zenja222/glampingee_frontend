import React, { useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";

function GlampingEditForm({ handleGlampingUpdate, glamping }) {
    const languages = [
        { code: 'et', label: 'Estonian' },
        { code: 'eng', label: 'English' }
    ];

    const [selectedLanguage, setSelectedLanguage] = useState('eng');
    const [languageData, setLanguageData] = useState({
        eng: { name: glamping.name.en || '', description: glamping.description.en || '' },
        et: { name: glamping.name.et || '', description: glamping.description.et || '' }
    });

    const validationSchema = Yup.object().shape({
        linkToBook: Yup.string().url("Must be a valid URL").required("Link to book is required"),
        county: Yup.string().min(3, "County must be at least 3 characters long").required("County is required"),
        price: Yup.number().positive("Price must be a positive number").required("Price is required"),
        picture: Yup.array().of(Yup.string().url("Each picture must be a valid URL"))
    });

    const handleLanguageChange = (e, setFieldValue) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);

        // Load stored values for the selected language
        const { name, description } = languageData[newLang];
        setFieldValue('name', name);
        setFieldValue('description', description);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const dataToSubmit = {
                ...values,
                name: {
                    en: languageData.eng.name,
                    et: languageData.et.name,
                },
                description: {
                    en: languageData.eng.description,
                    et: languageData.et.description,
                }
            };
            await handleGlampingUpdate({ ...glamping, ...dataToSubmit });
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
                    linkToBook: glamping.linkToBook,
                    county: glamping.county,
                    price: glamping.price,
                    picture: glamping.picture || ['']
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form className="form-group">
                        {/* Language Selection */}
                        <select
                            value={selectedLanguage}
                            onChange={(e) => handleLanguageChange(e, setFieldValue)}
                            className="form-control mb-2"
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>

                        {/* Name Field */}
                        <Field
                            className="form-control mb-2"
                            name="name"
                            type="text"
                            placeholder={selectedLanguage === 'et' ? "Sisestage Glampingu nimi Eesti keeles" : "Enter Glamping name in English"}
                            onBlur={() =>
                                setLanguageData({
                                    ...languageData,
                                    [selectedLanguage]: { ...languageData[selectedLanguage], name: values.name }
                                })
                            }
                        />
                        {errors.name && touched.name && <div>{errors.name}</div>}

                        {/* Description Field */}
                        <Field
                            className="form-control mb-2"
                            name="description"
                            type="text"
                            placeholder={selectedLanguage === 'et' ? "Sisestage kirjeldus Eesti keeles" : "Enter description in English"}
                            onBlur={() =>
                                setLanguageData({
                                    ...languageData,
                                    [selectedLanguage]: { ...languageData[selectedLanguage], description: values.description }
                                })
                            }
                        />
                        {errors.description && touched.description && <div>{errors.description}</div>}

                        {/* Other Fields */}
                        <Field className="form-control mb-2" name="linkToBook" type="url" placeholder="Booking link" />
                        {errors.linkToBook && touched.linkToBook && <div>{errors.linkToBook}</div>}

                        <Field className="form-control mb-2" name="county" type="text" placeholder="County" />
                        {errors.county && touched.county && <div>{errors.county}</div>}

                        <Field className="form-control mb-2" name="price" type="number" placeholder="Price" />
                        {errors.price && touched.price && <div>{errors.price}</div>}

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

                        <Button variant="warning" type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default GlampingEditForm;


