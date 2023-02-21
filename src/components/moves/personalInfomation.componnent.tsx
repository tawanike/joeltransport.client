import {Formik} from 'formik';
import {useContext} from 'react';
import {Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {BookingContext} from 'src/_contexts/booking.context';
import {useAPI} from 'src/_hooks';
import * as yup from 'yup';

const PersonalInformation = () => {
	const api = useAPI();
	const bookingContext = useContext(BookingContext);
	const schema = yup.object().shape({
		first_name: yup.string().required(),
		last_name: yup.string().required(),
		phone_number: yup.string().required(),
		email: yup.string().email().required()
	});

	const handleOnChanged = (e: any) => {
		console.log(e.target.value);
	};

	return (
		<>
			<Formik
				validationSchema={schema}
				onSubmit={(values: any) => {
					// Create user profile with given data
					// keep the information in the state
					// Save the information to localStorage
					// Redirect to next page
					api.post(
						`/bookings/${bookingContext.state.selected.id}/users`,
						values
					).then((res) => {
						console.log(res);
					});
				}}
				initialValues={{
					first_name: '',
					last_name: '',
					phone_number: '',
					email: ''
				}}
			>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Row className="mb-5">
							<Form.Group as={Col} md="6" controlId="first_name">
								<Form.Control
									name="first_name"
									placeholder="Name"
									value={values.first_name}
									onChange={handleOnChanged}
									isValid={
										touched.first_name && !errors.first_name
									}
								/>
								<Form.Control.Feedback>
									Looks good!
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="last_name">
								<Form.Control
									name="last_name"
									placeholder="Last name"
									value={values.last_name}
									onChange={handleOnChanged}
									isValid={
										touched.last_name && !errors.last_name
									}
								/>
								<Form.Control.Feedback>
									Looks good!
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row className="mb-5">
							<Form.Group
								as={Col}
								md="6"
								controlId="phone_number"
							>
								<Form.Control
									name="phone_number"
									placeholder="Phone number"
									value={values.phone_number}
									onChange={handleOnChanged}
									isValid={
										touched.phone_number &&
										!errors.phone_number
									}
								/>
								<Form.Control.Feedback>
									Looks good!
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="email">
								<Form.Control
									name="email"
									placeholder="Email"
									value={values.email}
									onChange={handleOnChanged}
									isValid={touched.email && !errors.email}
								/>
								<Form.Control.Feedback>
									Looks good!
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default PersonalInformation;
