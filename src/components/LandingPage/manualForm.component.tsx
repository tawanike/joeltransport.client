import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FcInfo } from "react-icons/fc";
import Select from "react-select";
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
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const countries = await fetchWrapper.get(
        "/locations/countries",
        undefined
      );
      setCountries(countries.results);
    };

    getCountries();
  }, []);

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
          // Create booking
          fetchWrapper
            .post("/bookings", {
              from_address: bookingState.formValues.from_address,
              to_address: bookingState.formValues.to_address,
              move_type: 0,
            })
            .then((res) => {
              console.log("res", res);
              // Save booking id to local storage
              localStorage.setItem("bookingId", res.id);
              router.push(`/move/domestic`);
              setShowSelectorModal(false);
            });
          // Save booking id to local storage
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
          <Form.Control {...register("postcode")} placeholder="Postal code" />
        </Form.Group>
      </Row>
      <Row className="mt-5">
        <Form.Group as={Col} md="6">
          <Form.Label>Province</Form.Label>
          <Form.Control {...register("province")} placeholder="Province" />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Country</Form.Label>
          <Select
            name="country"
            placeholder="Country"
            options={countries.map((c) => {
              return {
                label: c.title,
                value: c.id,
              };
            })}
          />
        </Form.Group>
      </Row>

      <Alert variant="primary" className="mt-3">
        <div className="row">
          <div className="col-12 Selector__instructions__get-started">
            <div className="row">
              <div
                className="col-1"
                style={{
                  display: "grid",
                  placeItems: "center",
                  fontSize: "2rem",
                }}
              >
                <FcInfo />
              </div>
              <div className="col-11">
                <b>Please note:</b> Please note: For relocations or storage
                outside of Gauteng Province, information will be collected and
                someone will contact you to provide you with a quote.
              </div>
            </div>
          </div>
        </div>
      </Alert>
      <Button type="submit" className="w-100" variant="secondary">
        Next
      </Button>
    </Form>
  );
}

export default AddressManualForm;
