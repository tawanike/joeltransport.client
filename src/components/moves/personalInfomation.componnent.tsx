import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { GET_BOOKING } from "src/_models/types";

const PersonalInformation = () => {
  const api = useAPI();
  const bookingContext = useContext(BookingContext);
  const [values, setValues] = useState<any>({
    first_name: bookingContext.state.formValues.user?.first_name,
    last_name: bookingContext.state.formValues.user?.last_name,
    email: bookingContext.state.formValues.user?.email,
    phone_number: bookingContext.state.formValues.user?.phone_number,
  });
  const [errors, setErrors] = useState<any>({
    first_name: true,
    last_name: true,
    email: true,
    phone_number: true,
  });
  const [touched, setTouched] = useState<any>({
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
  });

  const handleOnChanged = (e: any) => {
    Object.assign(values, { [e.target.name]: e.target.value });
    setValues({ ...values });
    setTouched({ ...touched, [e.target.name]: true });
    bookingContext.dispatch({
      type: "ADD_FORM_VALUES",
      payload: {
        user: { ...values },
      },
    });
  };

  const handleOnBlur = (e: any) => {
    values.booking = bookingContext.state.formValues.id;
    if (
      values.first_name === "" ||
      values.first_name === undefined ||
      values.first_name === " "
    ) {
      setErrors({ ...errors, first_name: true });
    } else {
      setErrors({ ...errors, first_name: false });
    }

    if (values.last_name === "" || values.last_name === undefined) {
      console.log("last name is empty");
      setErrors({ ...errors, last_name: true });
    } else {
      setErrors({ ...errors, last_name: false });
    }

    if (
      values.phone_number === "" ||
      values.phone_number === undefined ||
      values.phone_number === " "
    ) {
      setErrors({ ...errors, phone_number: true });
    } else {
      setErrors({ ...errors, phone_number: false });
    }

    if (values.email === "" || values.email === undefined) {
      setErrors({ ...errors, email: true });
    } else {
      setErrors({ ...errors, email: false });
    }

    if (
      values.first_name !== "" &&
      values.first_name !== undefined &&
      values.first_name !== " " &&
      values.last_name !== "" &&
      values.last_name !== undefined &&
      values.last_name !== " " &&
      values.email !== "" &&
      values.email !== undefined &&
      values.email !== " " &&
      values.phone_number !== "" &&
      values.phone_number !== undefined &&
      values.phone_number !== " "
    ) {
      api
        .post(`/bookings/${bookingContext.state.formValues.id}/users`, values)
        .then((res) => {
          if (res.message == "ok") {
            api
              .get(`/bookings/${bookingContext.state.formValues.id}`, false)
              .then((res) => {
                bookingContext.dispatch({
                  type: GET_BOOKING,
                  payload: {
                    formValues: { users: { ...values } },
                  },
                });
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  console.log("bookingContext.state", bookingContext.state);
  return (
    <>
      <Form noValidate>
        <Row className="mb-5">
          <Form.Group as={Col} md="6" controlId="first_name">
            <Form.Control
              name="first_name"
              placeholder="Name"
              value={values.first_name}
              onChange={handleOnChanged}
              onBlur={handleOnBlur}
              onFocus={handleOnBlur}
              isValid={touched.first_name && !errors.first_name}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="last_name">
            <Form.Control
              name="last_name"
              placeholder="Last name"
              value={values.last_name}
              onChange={handleOnChanged}
              onBlur={handleOnBlur}
              onFocus={handleOnBlur}
              isValid={touched.last_name && !errors.last_name}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-5">
          <Form.Group as={Col} md="6" controlId="phone_number">
            <Form.Control
              name="phone_number"
              placeholder="Phone number"
              value={values.phone_number}
              onChange={handleOnChanged}
              onBlur={handleOnBlur}
              onFocus={handleOnBlur}
              isValid={touched.phone_number && !errors.phone_number}
            />
            {touched.phone_number && !errors.phone_number && (
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Control
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleOnChanged}
              onBlur={handleOnBlur}
              onFocus={handleOnBlur}
              isValid={touched.email && !errors.email}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};

export default PersonalInformation;
