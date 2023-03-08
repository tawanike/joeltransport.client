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
    const currentAddons = bookingState.formValues.addOns || [];
    if (currentAddons.includes(item.target.value)) {
      const index = currentAddons.indexOf(item.target.value);
      if (index > -1) {
        currentAddons.splice(index, 1);
      }
    } else {
      currentAddons.push(item.target.value);
    }

    bookingDispatch({
      type: "ADD_FORM_VALUES",
      payload: {
        addOns: currentAddons,
      },
    });

    await api.post(`/bookings/${bookingState.formValues.id}/products/addons`, {
      booking: bookingState.formValues.id,
      product: item.target.value,
      category: 0,
      selected: item.target.checked,
    });
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
                checked={bookingState.formValues?.addOns?.includes(item.id)}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default AddedServices;
