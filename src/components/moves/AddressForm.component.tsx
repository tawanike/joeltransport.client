import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useAPI } from "src/_hooks";

type Props = {
  address: any;
};

function AddressForm({ address }: Props) {
  const api = useAPI();
  const [countries, setCountries] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { ...address },
  });

  useEffect(() => {
    const getCountries = async () => {
      const countries = await api.get("/locations/countries", undefined);
      setCountries(countries.results);
    };

    getCountries();
  }, []);

  const onSubmit = (data: any) => {
    const address_id = data.id;
    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    api.put(`/addresses/${address_id}`, data);
    setEditMode(false);
  };

  return (
    <>
      {editMode ? (
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={11} style={{ overflow: "hidden" }}>
              {address.formatted_address}
            </Col>
            <Col md={1} onClick={() => setEditMode(false)}>
              close
            </Col>
          </Row>
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
                options={countries.map((c) => {
                  return {
                    label: c.title,
                    value: c.id,
                  };
                })}
              />
            </Form.Group>
          </Row>

          <Button
            type="button"
            className="w-100"
            variant="secondary"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Form>
      ) : (
        <Row>
          <Col md={11}>{address.formatted_address}</Col>
          <Col md={1} onClick={() => setEditMode(true)}>
            Edit
          </Col>
        </Row>
      )}
    </>
  );
}

export default AddressForm;
