import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import useAPI from "src/_hooks/useAPI";
import useNumberInput from "../../_hooks/useNumberInput";

type Props = {
  item: any;
};

function InventoryItem({ item }: Props) {
  const api = useAPI();
  const [selected, setSelected] = useState(false);
  const bookingContext = useContext(BookingContext);
  const { ValueDisplay: itemCount, Value: itemCountValue } = useNumberInput();

  const handleSelect = async (item: any) => {
    console.log(`Inventory Item`, item.target.id);
    setSelected(!selected);
  };

  useEffect(() => {
    async function addInventoryItem() {
      if (!selected) {
        const data = {
          item: item.target.id,
          quantity: itemCountValue || 1,
          booking: bookingContext.state.formValues.id,
        };

        const response = await api.post("/inventory/booking-items", data);
        console.log(response);
      } else {
      }
    }
    addInventoryItem();
  }, [itemCountValue]);

  return (
    <Row className="InventoryItem mb-4">
      <Col>
        <Form.Check
          inline
          type="checkbox"
          label={item.title}
          id={item.id}
          onChange={handleSelect}
        />
      </Col>
      <Col>{itemCount}</Col>
    </Row>
  );
}

export default InventoryItem;
