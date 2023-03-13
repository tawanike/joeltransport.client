import { FC, useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
interface IProps {}

const AddedServices: FC<IProps> = ({}) => {
  const api = useAPI();
  const [addons, setAddons] = useState<any[]>([]);
  const { state: bookingState, dispatch: bookingDispatch } =
    useContext(BookingContext);

  const handleSelect = async (item: any) => {
    const response = await api.post(
      `/bookings/${bookingState.formValues.id}/products/addons`,
      {
        booking: bookingState.formValues.id,
        product: item.target.value,
        category: 0,
        selected: item.target.checked,
      }
    );

    console.log("response", response);
  };

  useEffect(() => {
    const getAddedServices = async () => {
      const results = await api.get("/products/addons", false);
      if (results) {
        setAddons(results.results);
      }
    };

    getAddedServices();
  }, []);

  return (
    <>
      <Row className="InventoryItem mb-4">
        {addons &&
          addons.map((item) => (
            <Col key={item.id} sm={12} className="mt-3">
              <Form.Check
                type="checkbox"
                label={item.title}
                id={String(item.id)}
                value={item.id}
                onChange={handleSelect}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default AddedServices;
