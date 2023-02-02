import { useState } from 'react';
import { Button, Col, Form as BSForm, Modal, Row } from 'react-bootstrap';
import { CoverImage, Uploader } from '../../components/ui';
import { BsCheckCircle } from 'react-icons/bs';
import { Formik, Field, Form, FormikProps, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import useAPI from '../../_hooks/useAPI';


const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const ContactUs = () => {
    const { post } = useAPI();
    const [show, setShow] = useState(false);

    const validationSchema = yup.object().shape({
        first_name: yup.string()
        .min(2, "First name must have at least two characters")
        .max(100, 'First name cannot exceed 100 characters')
        .required('First name is required'),
        last_name: yup.string()
        .min(2, "Last names must have at least two characters")
        .max(100, 'Last names cannot exceed 100 characters')
        .required('Last name is required'),
        email: yup.string()
        .email('Must be a valid email address')
        .required('Email address is required'),
        phone_number: yup.string()
        .matches(phoneRegExp)
        .required('Phone number is required'),
        message: yup.string()
        .required('Message is required'),
        contact_reasons: yup.string()
        .required('Contact reason is required'),
        service_options: yup.string()
        .required('Please select at least one option')
    });

    return (
        <div className="resources container-fluid">
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    <div className="col-12 py-5">
                        <div className="row">
                            <div className="col-12 resources__modal__icon">
                                <BsCheckCircle />
                            </div>
                            <div className="col-12 resources__modal__head mt-4">
                                <h3>Success</h3>
                            </div>
                            <div className="col-8 offset-2 resources__modal__text mt-4">
                                <p>Your call me back, request has been sent successfully
                                    will be in-touch soon!</p>
                            </div>
                            <div className="col-12 resources__modal__button mt-4">
                                <Button variant='secondary' className="col-4" onClick={() => setShow(false)} >Done</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <CoverImage
                size="medium"
                src="/img/services/resources_banner.png"
                pageTitle='Contact us'
                description='Looking for an expect for your move or storage? '
            />

            <div className="resources__article container mt-5">
                <div className="row">
                    <div className="col-6">
                        <h2 className='mb-5'>Get in touch</h2>
                        <Formik
                            initialValues={{
                                first_name: "",
                                last_name: "",
                                email: "",
                                phone_code: "",
                                phone_number: "",
                                message: "",
                                category: "",
                                service_options: "",
                                attachment: ""
                             }}
                            onSubmit={async (values: any, actions) => {
                                const formData = new FormData();
                                formData.append('attachment', values.attachment);
                                formData.append('first_name', values.first_name);
                                formData.append('last_name', values.last_name);
                                formData.append('email', values.email);
                                formData.append('message', values.message);
                                formData.append('category', values.category);
                                formData.append('service_options', values.service_options);

                                if ( parsePhoneNumber && parsePhoneNumber(values.phone_number)) {
                                    const phoneNumber: any = parsePhoneNumber(values.phone_number);
                                    if(phoneNumber.country) {
                                        formData.append('phone_code', phoneNumber.countryCallingCode);
                                        formData.append('phone_number', phoneNumber.phone_number);
                                    }
                                }

                                const results: any = await fetch('http://localhost:8000/v1/contacts', {
                                    method: 'POST',
                                    body: formData
                                });

                                if (results.status === 201) setShow(true);
                                // Handle errors
                            }}
                            validationSchema={validationSchema}
                            >
                                {(props: FormikProps<any>) => (
                                    <Form encType="multipart/form-data">
                                        <Row className="mb-5">
                                            <BSForm.Group as={Col} md="6" controlId="first_name">
                                                <ErrorMessage name="first_name" />
                                                <Field
                                                    type="text"
                                                    placeholder="First name*"
                                                    name="first_name"
                                                    onChange={props.handleChange}
                                                    className="form-control"
                                                />
                                            </BSForm.Group>
                                            <BSForm.Group as={Col} md="6" controlId="last_name">
                                                <ErrorMessage name="last_name" />
                                                <Field
                                                    type="text"
                                                    placeholder="Last name*"
                                                    name="last_name"
                                                    onChange={props.handleChange}
                                                    className="form-control"
                                                />
                                            </BSForm.Group>
                                        </Row>
                                        <Row className="mb-5">
                                            <BSForm.Group as={Col} md="12" controlId="email">
                                            <ErrorMessage name="email" />
                                                <Field
                                                    type="email"
                                                    placeholder="Email*"
                                                    name="email"
                                                    onChange={props.handleChange}
                                                    className="form-control"
                                                />
                                            </BSForm.Group>
                                        </Row>
                                        <Row className="mb-5">
                                            <BSForm.Group as={Col} md="12" controlId="emailAdd">
                                                <ErrorMessage name="phone_number" />
                                                <PhoneInput
                                                    defaultCountry='ZA'
                                                    placeholder="Enter phone number*"
                                                    value={props.values.phone_number}
                                                    onChange={(value) =>  props.setFieldValue("phone_number", value)}
                                                />
                                            </BSForm.Group>
                                        </Row>
                                        <Row className="mb-5">
                                            <BSForm.Group as={Col} md="12" controlId="message">
                                            <ErrorMessage name="message" />
                                                <Field
                                                    placeholder="Message*"
                                                    as="textarea"
                                                    rows={6}
                                                    name="message"
                                                    onChange={props.handleChange}
                                                    className="form-control"
                                                />
                                            </BSForm.Group>
                                        </Row>
                                        <Row className="mb-5">
                                            <BSForm.Group as={Col} md="12" controlId="category">
                                            <ErrorMessage name="category" />
                                                <BSForm.Select
                                                    onChange={props.handleChange}>
                                                    <option value="0" disabled selected>Need assistance with?*</option>
                                                    <option value="1">Schedule a move</option>
                                                    <option value="2">Schedule a survey</option>
                                                    <option value="3">General enquiry</option>
                                                </BSForm.Select>
                                            </BSForm.Group>
                                        </Row>
                                        <h5 className='mb-5'>Service options*</h5>
                                        <ErrorMessage name="service_options" />
                                        <Row >
                                            <BSForm.Group as={Col} md="4" className="mb-5">
                                                <BSForm.Label>
                                                <Field
                                                    type="checkbox"
                                                    name="service_options"
                                                    value="0"
                                                    className="m-1"
                                                />
                                                Home move</BSForm.Label>
                                            </BSForm.Group>
                                            <BSForm.Group as={Col} md="4" className="mb-5">
                                            <BSForm.Label>
                                                <Field
                                                    type="checkbox"
                                                    label="Office move"
                                                    name="service_options"
                                                    value="1"
                                                    className="m-1"
                                                />
                                                Office move</BSForm.Label>
                                            </BSForm.Group>
                                            <BSForm.Group as={Col} md="4" className="mb-5">
                                            <BSForm.Label>
                                                <Field
                                                    type="checkbox"
                                                    label="Specialized move"
                                                    name="service_options"
                                                    value="2"
                                                    className="m-1"
                                                />
                                                Specialized move</BSForm.Label>
                                            </BSForm.Group>
                                            <BSForm.Group as={Col} md="4" className="mb-5">
                                            <BSForm.Label>
                                                <Field
                                                    type="checkbox"
                                                    label="Storage"
                                                    name="service_options"
                                                    value="3"
                                                    className="m-1"
                                                />
                                                Storage</BSForm.Label>
                                            </BSForm.Group>
                                            <BSForm.Group as={Col} md="6" className="mb-5">
                                            <BSForm.Label>
                                                <Field
                                                    type="checkbox"
                                                    label="Please call me back"
                                                    name="service_options"
                                                    value="4"
                                                    className="m-1"
                                                />
                                                Please call me back</BSForm.Label>
                                            </BSForm.Group>
                                        </Row>

                                        <Row className="mb-5">
                                            <Uploader onChange={(files) => props.setFieldValue("attachment", files[0])}/>
                                        </Row>
                                        <Button variant="secondary" className='p-3 col-12' type="submit">Send</Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    <div className="col-6">
                    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.870415206315!2d28.102337518381077!3d-25.840815010782684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957b55d70a907d%3A0x44e13465cf5a7713!2s10%20Van%20Tonder%20St%2C%20Sunderland%20Ridge%2C%20Centurion%2C%200157!5e0!3m2!1sen!2sza!4v1660723954319!5m2!1sen!2sza"
        width="100%" height="650" style={{border: 0 }} loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;
