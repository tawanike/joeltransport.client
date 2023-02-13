/* eslint-disable react/no-unescaped-entities */
import { Formik } from "formik";
import { Dispatch, FC, SetStateAction } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { AuthView } from "../../../_models/types";

const schema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().required("Password is required").oneOf([yup.ref('confirmPassword'), null], 'Passwords must match'),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('password'), null], 'Passwords must match'),
    terms: yup.bool().oneOf([true], "Please accept the terms and conditions"),
});

interface IProps {
    setAuthView: Dispatch<SetStateAction<AuthView>>;
}
const SignupComponent: FC<IProps> = ({ setAuthView }) => {
    return <>
        <div className="auth__login-form p-2">
            <div className="auth__login-form__header">
                <h3>Sign up</h3>
                <p>Fill in your details below and Sign up</p>
            </div>
            <div className="auth__login-form__body">
                <div className="col-12 auth__button auth__button--facebook">
                    <FaFacebookF className="me-2" /> Sign up with Facebook
                </div>
                <div className="col-12 auth__button auth__button--google">
                    <FcGoogle className="me-2" /> Sign up with Google
                </div>
                <hr className="hr-text" data-content="or"></hr>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        terms: false,
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="first_name">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        value={values.first_name}
                                        onChange={handleChange}
                                        isInvalid={touched.first_name && !!errors.first_name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.first_name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="last_name">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        value={values.last_name}
                                        onChange={handleChange}
                                        isInvalid={touched.last_name && !!errors.last_name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.last_name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="my-3" as={Col} md="12" controlId="validation-password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={touched.password && !!errors.password}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="my-3" as={Col} md="12" controlId="confirm-password">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" >
                                    <Form.Check
                                        required
                                        name="terms"
                                        value={"true"}
                                        label={<>I agree to the <span onClick={(e) => {
                                            e.preventDefault();
                                        }} className="auth__bottom-text__link">Terms of Service</span> and <span onClick={(e) => {
                                            e.preventDefault();
                                        }} className="auth__bottom-text__link">Privacy Notice</span></>}
                                        onChange={handleChange}
                                        isInvalid={!!errors.terms}
                                        feedback={errors.terms}
                                        feedbackType="invalid"
                                        id="rememberPassword"
                                    />
                                </Form.Group>
                            </Row>
                            <Button variant="secondary" className="col-12" type="submit">Submit form</Button>
                        </Form>
                    )}
                </Formik>
                <div className="col-12 auth__bottom-text">
                    <p>Already have an account? <span onClick={() => setAuthView("login")} className="auth__bottom-text__link">Login now</span></p>
                </div>
            </div>
        </div>
    </>
}

export default SignupComponent;
