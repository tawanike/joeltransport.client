import {FC, useContext, useEffect, useState} from 'react';
import {Alert, Col, Form} from 'react-bootstrap';
import {FcInfo} from 'react-icons/fc';
import Select from 'react-select';
import {addBakkieShuttle} from 'src/_actions/added-services.actions';
import {getBooking} from 'src/_actions/booking.actions';
import {BookingContext} from 'src/_contexts/booking.context';
import {useAPI} from 'src/_hooks';
import CostSummaryStateContext from '../../_contexts/costSummary.context';

interface IProps {}
const AddedServices: FC<IProps> = () => {
	const api = useAPI();
	const {CostSummaryState, dispatchCostSummary} = useContext(
		CostSummaryStateContext
	);
	const {state: bookingState, dispatch: dispatchBookings} =
		useContext(BookingContext);

	const [bakkieShuttle, setBakkieShuttle] = useState(null);
	const [bakkieShuttleRequired, setBakkieShuttleRequired] = useState(false);

	const requireBakkieShuttle = (selected: any) => {
		if (selected.value == 'yes') {
			setBakkieShuttleRequired(true);
		} else {
			setBakkieShuttleRequired(false);
		}
	};

	useEffect(() => {
		(async () => {
			const response = await api.get('/products?category=3', false);
			setBakkieShuttle(
				response.results.find(
					(product) => product.slug === 'bakkie-shuttle'
				)
			);
		})();
	}, []);

	const selectBakkieShuttle = (selected: any) => {
		console.log('selectBakkieShuttle', selected.value);

		const price = bakkieShuttle?.price || 0;
		dispatchCostSummary(
			addBakkieShuttle({
				quantity: selected.value === 2 ? 1.75 : 1,
				price: price
			})
		);

		// TODO: Save to database
		if (bookingState.selected && bakkieShuttle) {
			api.post(`/bookings/${bookingState.selected.id}/products`, {
				product: bakkieShuttle?.id,
				address: selected.value,
				product_type: 'bakkie-shuttle',
				booking: bookingState.selected.id
			}).then((res) => {
				if (!res.error) {
					// setChooseTruckComplete(true);
					api.get(
						`/bookings/${bookingState.selected.id}`,
						false
					).then((res) => {
						if (!res.error) {
							dispatchBookings(getBooking(res));
						}
					});
				}
			});
		}
	};

	return (
		<>
			<div>
				<h5 className="my-3">Do you required a bakkie shuttle?</h5>
				<div>
					<Form.Check
						inline
						label="Yes"
						name="requires_bakkie_shuttle"
						type="radio"
						onChange={() => requireBakkieShuttle({value: 'yes'})}
						className="pe-5"
					/>
					<Form.Check
						inline
						label="No"
						name="requires_bakkie_shuttle"
						onChange={() => requireBakkieShuttle({value: 'no'})}
						type="radio"
					/>
					<Alert variant="primary" className="mt-3">
						<div className="row">
							<div
								className="col-1"
								style={{
									display: 'grid',
									placeItems: 'center',
									fontSize: '2rem'
								}}
							>
								<FcInfo />
							</div>
							<div className="col-11">
								<b>Please note:</b> Only applicable when access
								for trucks in complexes is restricted, a bakkie
								is offered at <b>R1,750.00 excl. VAT</b>, to
								shuttle your items from your house to the truck.
							</div>
						</div>
					</Alert>
					{bakkieShuttleRequired && (
						<Form.Group as={Col} md="8" controlId="bakkie_address">
							<Form.Label>
								Select address for a bakkie shuttle
							</Form.Label>
							<Select
								name="to_property_type"
								placeholder="Select address"
								onChange={selectBakkieShuttle}
								options={[
									{value: 0, label: 'Loading address'},
									{value: 1, label: 'Delivery address'},
									{value: 2, label: 'Both address'}
								]}
								className=""
							/>
						</Form.Group>
					)}
				</div>
			</div>
		</>
	);
};

export default AddedServices;
