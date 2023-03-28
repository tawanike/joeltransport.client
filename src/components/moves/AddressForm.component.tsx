import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import Select from "react-select";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";

type Props = {
  address: any;
  address_type: string;
};

function AddressForm({ address, address_type }: Props) {
  const api = useAPI();
  const [countries, setCountries] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { ...address },
  });

  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);

  useEffect(() => {
    // if (!bookingState.formValues.id) {
    //   window.location.href = "/";
    // }
    const getCountries = async () => {
      const countries = await api.get("/locations/countries", undefined);
      setCountries(countries.results);
    };

    getCountries();
  }, []);

  useEffect(() => {}, [editMode]);

  useEffect(() => {
    reset(address);
  }, [address]);

  const onSubmit = (data: any) => {
    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    api.put(`/addresses/${address.id}`, data).then((res) => {
      if (address_type === "from_address") {
        bookingsDispatch({
          type: ADD_FORM_VALUES,
          payload: {
            from_address: res,
            from_address_original: res,
          },
        });
      } else {
        bookingsDispatch({
          type: ADD_FORM_VALUES,
          payload: {
            to_address: res,
            to_address_original: res,
          },
        });
      }
    });

    setEditMode(false);
  };

  return (
    <>
      {editMode ? (
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={11} style={{ overflow: "hidden" }}>
              {formattedAddress(address, countries)}
            </Col>
            <Col md={1}>
              <button
                onClick={() => setEditMode(false)}
                style={{ border: 0, backgroundColor: "#fff" }}
              >
                <MdClose color="red" />
              </button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Form.Group as={Col} md="6">
              <Form.Label>Unit number</Form.Label>
              <Form.Control
                {...register("unit_number")}
                placeholder="Unit number"
                id="unit_number"
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
                {...register("postcode")}
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
              <Select
                name="country"
                placeholder="Country"
                defaultValue={{
                  label:
                    countries &&
                    countries.length > 0 &&
                    address &&
                    address.country &&
                    countries.find(
                      (country: any) => country.id == address.country
                    )?.title,
                  value:
                    countries &&
                    countries.length > 0 &&
                    address &&
                    address.country &&
                    countries.find(
                      (country: any) => country.id == address.country
                    )?.id,
                }}
                options={countries.map((c) => {
                  return {
                    label: c.title,
                    value: c.id,
                  };
                })}
              />
            </Form.Group>
          </Row>
          <Row className="mt-4">
            <Col className="d-flex align-items-end justify-content-end">
              <Button
                type="button"
                className=""
                variant="secondary"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <div className="row form-control" style={{ padding: 0 }}>
          <Row style={{ padding: 8 }}>
            <Col md={11} className="d-flex align-items-center">
              {formattedAddress(address, countries)}
            </Col>
            <Col
              className="text-right btn btn-secondary d-flex align-items-center justify-content-center"
              md={1}
              sm={1}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

const formattedAddress = (address: any, countries: any[]) => {
  if (address)
    return `${address.unit_number == null ? "" : address.unit_number} ${
      address.complex_name == null ? "" : address.complex_name
    } ${address.street_address == null ? "" : address.street_address} ${
      address.suburb == null ? "" : address.suburb
    } ${address.city == null ? "" : address.city} ${
      address.postcode == null ? "" : address.postcode
    } ${address.province == null ? "" : address.province} ${
      countries &&
      countries.length > 0 &&
      address &&
      address.country &&
      countries.find((country: any) => country.id == address.country)?.title
    }`;
};

export default AddressForm;
