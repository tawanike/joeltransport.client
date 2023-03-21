import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import useAPI from "src/_hooks/useAPI";
import { ADD_INVENTORY_ITEM, DELETE_INVENTORY_ITEM } from "src/_models/types";
import useNumberInput from "../../_hooks/useNumberInput";

type Props = {
    item: any;
    room: number;
};

function InventoryItem({ item, room }: Props) {
    const api = useAPI();

    const bookingContext = useContext(BookingContext);
    const itemQnty = bookingContext.state.inventoryList.find((x) => x.inventory_item === item.id)?.quantity || 0;
    const [selected, setSelected] = useState(Boolean(itemQnty));
    const { ValueDisplay: itemCount, Value: itemCountValue, Disable } = useNumberInput(itemQnty, !Boolean(itemQnty));

    const handleSelect = async (itm: any) => {
        setSelected(itm.target.checked);
        Disable(!itm.target.checked);
        if (!itm.target.checked) {
            bookingContext.dispatch({
                type: DELETE_INVENTORY_ITEM,
                payload: itm.target.value,
            });
            const data: any = {
                inventory_item: item.id,
                quantity: 0,
                booking: bookingContext.state.formValues.id,
                room
            };
            await api.post("/inventory/booking-items", data);
        }

    };

    useEffect(() => {


        async function addInventoryItem() {
            console.log(itemCountValue, selected);
            if (selected) {
                const data: any = {
                    inventory_item: item.id,
                    quantity: itemCountValue,
                    booking: bookingContext.state.formValues.id,
                    room
                };

                const newArray = [...bookingContext.state.inventoryList];

                let objectToUpdate = newArray.find(
                    (obj) => obj.inventory_item === item.id
                );

                if (objectToUpdate) {
                    objectToUpdate.quantity = itemCountValue;
                } else {
                    objectToUpdate = data;
                }

                bookingContext.dispatch({
                    type: ADD_INVENTORY_ITEM,
                    payload: objectToUpdate,
                });
                await api.post("/inventory/booking-items", data);
            }
        }
        addInventoryItem();
    }, [itemCountValue]);

    const isSelected = (id: string) => {
        return bookingContext.state.inventoryList.some(
            (x) => x.inventory_item === id
        );
    };

    return (
        <Row className="InventoryItem mb-4">
            <Col>
                {isSelected(item.id) ? (
                    <Form.Check
                        inline
                        type="checkbox"
                        label={item.title}
                        value={item.id}
                        id={item.id}
                        onChange={handleSelect}
                        checked={true}
                    />
                ) : (
                    <Form.Check
                        inline
                        type="checkbox"
                        label={item.title}
                        value={item.id}
                        id={item.id}
                        onChange={handleSelect}
                    />
                )}
            </Col>
            <Col>{itemCount}</Col>
        </Row>
    );
}

export default InventoryItem;
