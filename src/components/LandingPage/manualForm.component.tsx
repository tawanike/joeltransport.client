import { useRouter } from "next/router";
import { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";

type Props = {
  setWhichAddress: (whichAddress: "to_address" | "from_address") => void;
  whichAddress: "to_address" | "from_address";
  setInternationalMove: (isInternationalMove: boolean) => void;
  setShowSelectorModal: (showSelectorModal: boolean) => void;
};

function AddressManualForm({
  setWhichAddress,
  whichAddress,
  setShowSelectorModal,
  setInternationalMove,
}: Props) {
  const fetchWrapper = useAPI();
  const { register, reset, handleSubmit } = useForm();
  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log(data);
    if (whichAddress === "from_address") {
      setWhichAddress("to_address");
    }
    // dispatch action to update to_address
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: { [whichAddress]: data },
    });

    if (whichAddress === "to_address") {
      console.log("bookingState.formValues", bookingState.formValues);
      if (
        bookingState.formValues.from_address &&
        bookingState.formValues.to_address
      ) {
        if (
          bookingState.formValues.from_address.province === "Gauteng" &&
          bookingState.formValues.to_address?.province === "Gauteng"
        ) {
          router.push(`/move/domestic`);
          setShowSelectorModal(false);
        } else {
          setInternationalMove(true);
        }
      }
    } else {
      reset();
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Row className="mt-5">
        <Form.Group as={Col} md="6">
          <Form.Label>Unit number</Form.Label>
          <Form.Control
            {...register("unit_number")}
            placeholder="Unit number"
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Complex name</Form.Label>
          <Form.Control
            {...register("complex_name")}
            placeholder="Complex name"
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} md="6">
          <Form.Label>Street address</Form.Label>
          <Form.Control
            {...register("street_address")}
            placeholder="Street address"
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Suburb</Form.Label>
          <Form.Control {...register("suburb")} placeholder="Suburb" />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} md="6">
          <Form.Label>City</Form.Label>
          <Form.Control {...register("city")} placeholder="City" />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            {...register("postal_code")}
            placeholder="Postal code"
          />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} md="6">
          <Form.Label>Province</Form.Label>
          <Form.Control {...register("province")} placeholder="Province" />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Country</Form.Label>
          <Form.Control {...register("country")} placeholder="Country" />
        </Form.Group>
      </Row>
      <Button type="submit" className="w-100" variant="secondary">
        Next
      </Button>
    </Form>
  );
}

export default AddressManualForm;
