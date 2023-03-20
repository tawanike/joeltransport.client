import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import useAPI from "src/_hooks/useAPI";
import { ADD_INVENTORY_ITEM } from "src/_models/types";
import useNumberInput from "../../_hooks/useNumberInput";

type Props = {
    item: any;
    room: number;
};

function InventoryItem({ item, room }: Props) {
    const api = useAPI();
    const [selected, setSelected] = useState(false);
    const bookingContext = useContext(BookingContext);
    const { ValueDisplay: itemCount, Value: itemCountValue, Disable } = useNumberInput(0, true);

    const handleSelect = async (item: any) => {
        setSelected(!selected);
        Disable(selected);
    };

    useEffect(() => {
        async function addInventoryItem() {
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
                        value={item.title}
                        id={item.id}
                        onChange={handleSelect}
                        checked={true}
                    />
                ) : (
                    <Form.Check
                        inline
                        type="checkbox"
                        label={item.title}
                        value={item.title}
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
