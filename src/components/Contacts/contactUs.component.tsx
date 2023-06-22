import { ErrorMessage, Field, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import PhoneInput from "react-phone-number-input";
import { CoverImage, Uploader } from "../ui";

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

interface IProps {
  isModal?: boolean;
}
const ContactUsComponent: FC<IProps> = ({ isModal = false }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [CanSend, setCanSend] = useState(false);

  const map = () => {
    return (
      <div className={isModal ? "col-12" : `col-12 col-md-6`}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.870415206315!2d28.102337518381077!3d-25.840815010782684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957b55d70a907d%3A0x44e13465cf5a7713!2s10%20Van%20Tonder%20St%2C%20Sunderland%20Ridge%2C%20Centurion%2C%200157!5e0!3m2!1sen!2sza!4v1660723954319!5m2!1sen!2sza"
          width="100%"
          height="650"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };

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
                <h3>Done</h3>
              </div>
              <div className="col-8 offset-2 resources__modal__text mt-4">
                <p>
                  Your request has been sent successfully! We’ll pop you an
                  email to confirm.
                </p>
              </div>
              <div className="col-12 resources__modal__button mt-4">
                <Button
                  variant="secondary"
                  className="col-4"
                  onClick={() => router.push("/")}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {!isModal && (
        <CoverImage
          size="medium"
          src="/img/services/resources_banner.png"
          pageTitle="Contact us"
          description="You’ve come to the right place!"
          variant="--resources"
        />
      )}

      <div className="resources__article container mt-5">
        <div className="row">
          <div className={isModal ? "col-12" : `col-12 col-md-6`}>
            <h2 className="mb-5">Get in touch</h2>
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
                attachment: "",
              }}
              onSubmit={async (values: any, actions) => {
                if (values.service_options.length == 0) {
                  actions.setFieldError(
                    "service_options",
                    "Please select at least one option"
                  );
                } else {
                  const formData = new FormData();
                  formData.append("attachment", values.attachment);
                  formData.append("first_name", values.first_name);
                  formData.append("last_name", values.last_name);
                  formData.append("email", values.email);
                  formData.append("message", values.message);
                  formData.append("category", values.category);
                  formData.append("service_options", values.service_options);
                  formData.append("phone_number", values.phone_number);

                  const results: any = await fetch(
                    "https://api.flmj.me/v1/contacts",
                    {
                      method: "POST",
                      body: formData,
                    }
                  );

                  if (results.status === 201) {
                    setShow(true);
                  }
                }
              }}
            >
              {(props: FormikProps<any>) => {
                setCanSend(
                  props.values.first_name &&
                    props.values.first_name !== "" &&
                    props.values.last_name &&
                    props.values.last_name !== "" &&
                    props.values.email &&
                    props.values.email !== "" &&
                    props.values.phone_number &&
                    props.values.phone_number !== "" &&
                    props.values.message &&
                    props.values.message !== "" &&
                    props.values.category &&
                    props.values.category !== "" &&
                    props.values.service_options &&
                    props.values.service_options !== "" &&
                    props.values.service_options.length > 0
                );
                return (
                  <Form
                    noValidate
                    validated={validated}
                    encType="multipart/form-data"
                    onSubmit={props.handleSubmit}
                  >
                    <Row className="mb-4">
                      <Form.Group as={Col} md="6" controlId="first_name">
                        <ErrorMessage name="first_name" />
                        <Field
                          type="text"
                          placeholder="Name*"
                          name="first_name"
                          onChange={props.handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mt-4 mt-md-0"
                        as={Col}
                        md="6"
                        controlId="last_name"
                      >
                        <ErrorMessage name="last_name" />
                        <Field
                          type="text"
                          placeholder="Last name*"
                          name="last_name"
                          onChange={props.handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-4">
                      <Form.Group as={Col} md="12" controlId="email">
                        <ErrorMessage name="email" className="text-success" />
                        <Field
                          type="email"
                          placeholder="Email*"
                          name="email"
                          onChange={props.handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-4">
                      <Form.Group as={Col} md="12" controlId="emailAdd">
                        <ErrorMessage name="phone_number" />
                        <PhoneInput
                          defaultCountry="ZA"
                          placeholder="Phone number*"
                          value={props.values.phone_number}
                          onChange={(value) =>
                            props.setFieldValue("phone_number", value)
                          }
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-4">
                      <Form.Group as={Col} md="12" controlId="message">
                        <ErrorMessage name="message" />
                        <Field
                          placeholder="Message*"
                          as="textarea"
                          rows={6}
                          name="message"
                          onChange={props.handleChange}
                          className="form-control"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-4">
                      <Form.Group as={Col} md="12" controlId="category">
                        <ErrorMessage name="category" />
                        <Form.Select onChange={props.handleChange}>
                          <option value="0" disabled selected>
                            {`I'd like to`}*
                          </option>
                          <option value="1">Schedule a move</option>
                          <option value="2">Schedule a survey</option>
                          <option value="3">General enquiry</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <h5 className="mb-4">How can we help?*</h5>
                    <ErrorMessage name="service_options" />
                    <Row>
                      <Form.Group as={Col} md="4" className="mb-4">
                        <Form.Label>
                          <Field
                            type="checkbox"
                            name="service_options"
                            value="0"
                            className="m-1"
                          />
                          Home move
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Col} md="4" className="mb-4">
                        <Form.Label>
                          <Field
                            type="checkbox"
                            label="Office move"
                            name="service_options"
                            value="1"
                            className="m-1"
                          />
                          Office move
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Col} md="4" className="mb-4">
                        <Form.Label>
                          <Field
                            type="checkbox"
                            label="Specialised move"
                            name="service_options"
                            value="2"
                            className="m-1"
                          />
                          Specialised move
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Col} md="4" className="mb-4">
                        <Form.Label>
                          <Field
                            type="checkbox"
                            label="Storage"
                            name="service_options"
                            value="3"
                            className="m-1"
                          />
                          Storage
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Col} md="6" className="mb-4">
                        <Form.Label>
                          <Field
                            type="checkbox"
                            label="Please call me back"
                            name="service_options"
                            value="4"
                            className="m-1"
                          />
                          Please call me back
                        </Form.Label>
                      </Form.Group>
                    </Row>

                    <Row className="mb-4">
                      <Uploader
                        onChange={(files) => {
                          props.setFieldValue("attachment", files[0]);
                          setFiles(files);
                        }}
                      />
                      <div>
                        {files.map((upload) => (
                          <Row key={upload.name}>
                            <Col sm={11}>{upload.name}</Col>
                            <Col
                              className="text-right"
                              onClick={() => {
                                props.setFieldValue("attachment", "");
                                setFiles([]);
                              }}
                            >
                              X
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </Row>
                    {isModal && map()}
                    <Button
                      disabled={!CanSend}
                      variant="secondary"
                      className="mb-4 p-3 col-12"
                      type="submit"
                    >
                      Send
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
          {!isModal && map()}
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
