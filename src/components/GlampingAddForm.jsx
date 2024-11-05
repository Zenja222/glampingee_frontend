import React, { useState } from 'react';
import './../Styles/addForm.css';
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";

const GlampingAddForm = ({ handleGlampingAdd }) => {
    const languages = [
        { code: 'et', label: 'Estonian' },
        { code: 'eng', label: 'English' }
    ];

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(1, "Name must be at least 1 character long").required("Name is required"),
        description: Yup.string().min(1, "Description must be at least 1 character long").required("Description is required"),
        linkToBook: Yup.string().url("Must be a valid URL").required("Link to book is required"),
        county: Yup.string().min(3, "County must be at least 3 characters long").required("County is required"),
        price: Yup.number().positive("Price must be a positive number").required("Price is required"),
    });

    const [selectedLanguage, setSelectedLanguage] = useState('eng');
    const [languageData, setLanguageData] = useState({
        eng: { name: '', description: '' },
        et: { name: '', description: ''}
    });

    const initialValues = {
        name: '',
        description: '',
        linkToBook: '',
        county: '',
        price: '',
        picture: [""],
    };

    const handleLanguageChange = (e, setFieldValue) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);

        // Load stored values for the selected language
        const { name, description } = languageData[newLang];
        setFieldValue('name', name);
        setFieldValue('description', description);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Prepare data to submit with language-specific names and descriptions
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

            await handleGlampingAdd(dataToSubmit);
            resetForm();
        } catch (error) {
            console.error("Error adding glamping:", error);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="mt-4">
            <h1>Add Glamping</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => handleLanguageChange(e, setFieldValue)}
                            className="form-control mb-2"
                        >
                            {languages.map(l => (
                                <option key={l.code} value={l.code}>
                                    {l.label}
                                </option>
                            ))}
                        </select>

                        <Field
                            className="form-control mb-2"
                            name="name"
                            type="text"
                            placeholder={selectedLanguage === 'et' ? "Sisestage Glampingu nimi Eesti keeles" : "Enter Glamping name in English"}
                            onBlur={() => setLanguageData({
                                ...languageData,
                                [selectedLanguage]: { ...languageData[selectedLanguage], name: values.name }
                            })}
                        />

                        <Field
                            className="form-control mb-2"
                            name="description"
                            type="text"
                            placeholder={selectedLanguage === 'et' ? "Sisestage kirjeldus Eesti keeles" : "Enter description in English"}
                            onBlur={() => setLanguageData({
                                ...languageData,
                                [selectedLanguage]: { ...languageData[selectedLanguage], description: values.description }
                            })}
                        />

                        {errors.description && touched.description && <div className="error">{errors.description}</div>}

                        <Field
                            className="form-control mb-2"
                            name="linkToBook"
                            type="url"
                            placeholder={selectedLanguage === 'et' ? "sisestage broneerimislink" : "Enter booking link"}
                            onBlur={() => setLanguageData({
                                ...languageData,
                                [selectedLanguage]: { ...languageData[selectedLanguage], description: values.description }
                            })}
                        />
                        {errors.linkToBook && touched.linkToBook && <div className="error">{errors.linkToBook}</div>}

                        <Field
                            className="form-control mb-2"
                            name="county"
                            type="text"
                            placeholder={selectedLanguage === 'et' ? "Sisestage maakond" : "Enter county"}
                            onBlur={() => setLanguageData({
                                ...languageData,
                                [selectedLanguage]: { ...languageData[selectedLanguage], description: values.description }
                            })}
                        />
                        {errors.county && touched.county && <div className="error">{errors.county}</div>}

                        <Field
                            className="form-control mb-2"
                            name="price"
                            type="number"
                            placeholder={selectedLanguage === 'et' ? "Sisestage hind" : "Enter price"}
                            onBlur={() => setLanguageData({
                                ...languageData,
                                [selectedLanguage]: { ...languageData[selectedLanguage], description: values.description }
                            })}
                        />
                        {errors.price && touched.price && <div className="error">{errors.price}</div>}

                        <FieldArray name="picture">
                            {({ remove, push }) => (
                                <div className="input-wrapper mb-3">
                                    {values.picture.map((_, picIndex) => (
                                        <div key={picIndex} className="mb-2 d-flex align-items-center">
                                            <Field
                                                className="form-control flex-grow-1"
                                                name={`picture[${picIndex}]`}
                                                type="text"
                                                placeholder={selectedLanguage === 'et' ? `Sisestage pildi URL ${picIndex + 1}` : `Enter picture URL ${picIndex + 1}`}
                                                onBlur={() => {
                                                    const updatedPictures = [...values.picture];
                                                    setLanguageData({
                                                        ...languageData,
                                                        [selectedLanguage]: { ...languageData[selectedLanguage], picture: updatedPictures }
                                                    });
                                                }}
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

                        <Button variant="warning" type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default GlampingAddForm;
