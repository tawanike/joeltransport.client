import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import useAPI from "src/_hooks/useAPI";
import { ADD_INVENTORY_ITEM } from "src/_models/types";
import useNumberInput from "../../_hooks/useNumberInput";

type Props = {
    item: any;
    setRoomCounts: any;
};

function InventoryItem({ item, setRoomCounts }: Props) {
    const api = useAPI();
    const [selected, setSelected] = useState(false);
    const bookingContext = useContext(BookingContext);
    const { ValueDisplay: itemCount, Value: itemCountValue } = useNumberInput(0);

    const handleSelect = async (item: any) => {
        setSelected(!selected);
    };

    useEffect(() => {
        async function addInventoryItem() {
            if (!selected) {
                const data = {
                    room: item.category,
                    item: item.id,
                    quantity: itemCountValue,
                    booking: bookingContext.state.formValues.id,
                };

                bookingContext.dispatch({
                    type: ADD_INVENTORY_ITEM,
                    payload: data,
                });
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
