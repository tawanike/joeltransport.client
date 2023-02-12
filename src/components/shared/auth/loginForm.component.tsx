/* eslint-disable react/no-unescaped-entities */
import { Formik } from "formik";
import { Dispatch, FC, SetStateAction } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { AuthView } from "../../../_models/types";

const schema = yup.object().shape({
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
    rememberPassword: yup.bool().oneOf([true, false]),
});

interface IProps {
    setAuthView: Dispatch<SetStateAction<AuthView>>;
}
const LoginComponent: FC<IProps> = ({ setAuthView }) => {
    return <>
        <div className="auth__login-form p-2">
            <div className="auth__login-form__header">
                <h3>Login</h3>
                <p>Please enter your details.</p>
            </div>
            <div className="auth__login-form__body">
                <div className="col-12 auth__button auth__button--facebook">
                    <FaFacebookF className="me-2" /> Log in with Facebook
                </div>
                <div className="col-12 auth__button auth__button--google">
                    <FcGoogle className="me-2" /> Log in with Google
                </div>
                <hr className="hr-text" data-content="or"></hr>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        email: '',
                        password: '',
                        rememberPassword: false,
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
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" >
                                    <Form.Check
                                        required
                                        name="rememberPassword"
                                        label="Remember password"
                                        onChange={handleChange}
                                        isInvalid={!!errors.rememberPassword}
                                        feedback={errors.rememberPassword}
                                        feedbackType="invalid"
                                        id="rememberPassword"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6" className="auth__login-form__body__forgot-password" >
                                    <p onClick={() => setAuthView("forgotPassword")}>Forgot password?</p>
                                </Form.Group>
                            </Row>
                            <Button variant="secondary" className="col-12" type="submit">Submit form</Button>
                        </Form>
                    )}
                </Formik>
                <div className="col-12 auth__bottom-text">
                    <p>Don't have an account? <span onClick={() => setAuthView("register")} className="auth__bottom-text__link">Sign up for free</span></p>
                </div>
            </div>
        </div>
    </>
}

export default LoginComponent;
