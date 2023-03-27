import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { BookingContext } from "src/_contexts/booking.context";
import useAPI from "src/_hooks/useAPI";
import { IInventoryItem, IRoom } from "src/_models/types";
import DisplayInvemtorySection from "./displayInventorySection.component";

type Props = {};

function InventoryForm({}: Props) {
  const api = useAPI();
  const bookingContext = useContext(BookingContext);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [inventoryItems, setInventoryItems] = useState<IInventoryItem[]>([]);
  const [values, setValues] = useState<any>({ description: "" });

  const handleOnBlur = async (e: any) => {
    const data: any = {
      inventory_item: "79c6d32c-645e-4d87-a74d-43aeea3633fb",
      quantity: 0,
      booking: bookingContext.state.formValues.id,
      room: 17,
      description: e.target.value,
    };
    await api.post("/inventory/booking-items", data);
  };

  const handleOnChanged = (e: any) => {
    Object.assign(values, { description: e.target.value });
    setValues({ ...values });

    bookingContext.dispatch({
      type: "ADD_FORM_VALUES",
      payload: {
        inventoryForm: { ...values },
      },
    });
  };

  useEffect(() => {
    (async () => {
      const roomsResponse = await api.get(
        "/categories/4/subcategories",
        undefined
      );
      setRooms(roomsResponse.results);
      const inventoryItemsResponse = await api.get("/inventory", undefined);
      setInventoryItems(inventoryItemsResponse.results);
    })();
  }, []);

  return (
    <div className="InventoryForm">
      <div className="Inventory__rooms">
        <Accordion>
          {rooms.map((room) => (
            <DisplayInvemtorySection
              key={room.id}
              room={room}
              inventoryItems={inventoryItems}
            />
          ))}
          <Accordion.Item eventKey="other">
            <Accordion.Header className="InventoryForm__display col-12">
              <div className="row w-100">
                <div className="col-8 InventoryForm__display__title">
                  <p>Other</p>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="Inventory__rooms--items">
                <Form noValidate>
                  <Form.Group controlId="description">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      placeholder="Other items"
                      value={values.description}
                      onChange={handleOnChanged}
                      onBlurCapture={handleOnBlur}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default InventoryForm;
