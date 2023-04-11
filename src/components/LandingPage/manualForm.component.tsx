import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FcInfo } from "react-icons/fc";
import Select from "react-select";
import { getBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";

type Props = {
  moveType: 0 | 1;
  setWhichAddress: (whichAddress: "to_address" | "from_address") => void;
  whichAddress: "to_address" | "from_address";
  setInternationalMove: (isInternationalMove: boolean) => void;
  setShowSelectorModal: (showSelectorModal: boolean) => void;
};

const joelTransportAddress = {
  street_address: "10 Von Tonder Street",
  suburb: "Sunderland Ridge",
  city: "Centurion",
  country: "South Africa",
  province: "Gauteng",
  postal_code: "0157",
};

function AddressManualForm({
  setWhichAddress,
  whichAddress,
  setShowSelectorModal,
  setInternationalMove,
  moveType,
}: Props) {
  const router = useRouter();
  const fetchWrapper = useAPI();
  const { register, reset, handleSubmit } = useForm();
  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);
  const [country, setCountry] = useState<any>(null);
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

  const createBooking = async (data: any) => {
    const booking = await fetchWrapper.post("/bookings", {
      from_address: bookingState.formValues.from_address,
      to_address: bookingState.formValues.to_address,
      move_type: moveType,
    });

    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: {
        to_address: booking.to_address,
        to_address_original: booking.to_address,
      },
    });

    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: {
        from_address: booking.from_address,
        from_address_original: booking.from_address,
      },
    });

    console.log("Booking created: ", booking);
    bookingsDispatch(getBooking(booking));

    if (
      bookingState.formValues.from_address.province === "Gauteng" &&
      bookingState.formValues.to_address.province === "Gauteng"
    ) {
      console.log("Booking created: ", booking);
      // Save booking id to local storage
      localStorage.setItem("bookingId", booking.id);
      if (moveType === 0) router.push(`/move/domestic`);
      else router.push(`/storage`);
      setShowSelectorModal(false);
    } else {
      if (moveType === 0) setInternationalMove(true);
      else router.push(`/contact-us`);
    }
  };

  const onSubmit = (data: any) => {
    data.country = country?.value;
    const whichAddress_original = whichAddress + "_original";
    bookingsDispatch({
      type: ADD_FORM_VALUES,
      payload: {
        [whichAddress]: data,
        [whichAddress_original]: data,
      },
    });

    if (moveType === 0) {
      if (whichAddress === "from_address") {
        setWhichAddress("to_address");
      }
    } else {
      bookingsDispatch({
        type: ADD_FORM_VALUES,
        payload: {
          to_address: joelTransportAddress,
          from_address: data,
          to_address_original: joelTransportAddress,
          from_address_original: data,
        },
      });
      setShowSelectorModal(false);
    }

    if (whichAddress === "from_address") {
      reset();
    }
  };

  useEffect(() => {
    if (
      bookingState.formValues.to_address &&
      bookingState.formValues.from_address
    )
      createBooking(bookingState.formValues);
  }, [bookingState.formValues.to_address]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Row className="mt-3">
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
      <Row className="mt-3">
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
      <Row className="mt-3">
        <Form.Group as={Col} md="6">
          <Form.Label>City</Form.Label>
          <Form.Control {...register("city")} placeholder="City" />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Postal code</Form.Label>
          <Form.Control {...register("postcode")} placeholder="Postal code" />
        </Form.Group>
      </Row>
      <Row className="mt-3">
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
            onChange={(value) => {
              setCountry(value);
            }}
          />
        </Form.Group>
      </Row>

      <div className="row mt-4">
        <div className="col-9 d-flex justify-content-end"></div>
        <div className="col-3">
          <Button type="submit" className="w-100" variant="secondary">
            Continue
          </Button>
        </div>
        <div
          className="col-12 pb-4 mt-4 mb-4 d-flex justify-content-center"
          style={{ borderBottom: "1px solid #ccc" }}
        >
          <div
            style={{
              height: 4,
              width: 32,
              backgroundColor: "#FA551E",
              borderRadius: 4,
              marginRight: 4,
            }}
          ></div>
          <div
            style={{
              height: 4,
              width: 24,
              backgroundColor: "#979797",
              borderRadius: 4,
            }}
          ></div>
        </div>
      </div>

      <Alert variant="info" className="mt-3">
        <div className="row">
          <div className="col-12 Selector__instructions__get-started">
            <div className="row">
              <div
                className="col-1"
                style={{
                  display: "grid",
                  placeItems: "center",
                  fontSize: "1.5rem",
                }}
              >
                <FcInfo />
              </div>
              <div className="col-11" style={{ fontSize: 12 }}>
                <b>Please note:</b> If {"you're"} outside of Gauteng Province,{" "}
                {"we'll"} draw up a quote for you based on your location.{" "}
                {"We'll"} be in touch!
              </div>
            </div>
          </div>
        </div>
      </Alert>
    </Form>
  );
}

export default AddressManualForm;
