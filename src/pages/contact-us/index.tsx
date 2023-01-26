import { useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { UploadButton } from 'react-uploader';
import { Uploader } from "uploader";
import { CoverImage } from '../../components/ui';
import { Wrapper } from "@googlemaps/react-wrapper";
import { BsCheckCircle } from 'react-icons/bs';

const ContactUs = () => {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const uploader = Uploader({
        apiKey: "free"
    });

    const options = {
        multi: true
    }

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
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-5">
                                <Form.Group as={Col} md="6" controlId="name">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Name"
                                        defaultValue=""
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="lastName">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last name"
                                        defaultValue=""
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-5">
                                <Form.Group as={Col} md="12" controlId="emailAdd">
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Email"
                                        defaultValue=""
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-5">
                                <Form.Group as={Col} md="12" controlId="emailAdd">
                                    <InputGroup>
                                        <DropdownButton
                                            variant="outline-secondary"
                                            title="Dropdown"
                                            id="input-group-dropdown-1"
                                        >
                                            <Dropdown.Item href="#">Action</Dropdown.Item>
                                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                        </DropdownButton>
                                        <Form.Control placeholder="Phone Number" aria-label="Text input with dropdown button" />
                                    </InputGroup>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-5">
                                <Form.Group as={Col} md="12" controlId="message">
                                    <Form.Control placeholder="Message" as="textarea" rows={6} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-5">
                                <Form.Group as={Col} md="12" controlId="message">
                                    <Form.Select aria-label="Default select example">
                                        <option value="0" disabled selected>Need assistance with?</option>
                                        <option value="1">Schedule a move</option>
                                        <option value="2">Schedule a survey</option>
                                        <option value="3">General enquiry</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <h5 className='mb-5'>Service options</h5>

                            <Row >
                                <Form.Group as={Col} md="4" className="mb-5">
                                    <Form.Check
                                        label="Home moves"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-5">
                                    <Form.Check
                                        label="Office move"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-5">
                                    <Form.Check
                                        label="Specialized move"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-5">
                                    <Form.Check
                                        label="Storage"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="4" className="mb-5">
                                    <Form.Check
                                        label="Please call me back"
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-5">
                                <UploadButton
                                    uploader={uploader}
                                    options={options}
                                    onComplete={files => {
                                        if (files.length === 0) {
                                            console.log('No files selected.')
                                        } else {
                                            console.log('Files uploaded:');
                                            console.log(files.map(f => f.fileUrl));
                                        }
                                    }}>
                                    {({ onClick }) =>
                                        <Button variant='outline-primary' className="col-12 p-5" onClick={onClick}>
                                            Upload additional files
                                        </Button>
                                    }
                                </UploadButton>
                            </Row>

                            <Button variant="secondary" className='p-3 col-12' type="button" onClick={() => setShow(true)}>Send</Button>
                        </Form>
                    </div>
                    <div className="col-6">
                        <Wrapper apiKey={"YOUR_API_KEY"}>

                        </Wrapper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;
