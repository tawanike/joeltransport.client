import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import useAPI from "src/_hooks/useAPI";
import { IInventoryItem, IRoom } from "src/_models/types";
import DisplayInvemtorySection from "./displayInventorySection.component";

type Props = {};

function InventoryForm({ }: Props) {
    const api = useAPI();
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [inventoryItems, setInventoryItems] = useState<IInventoryItem[]>([]);

    useEffect(() => {
        console.log(localStorage.getItem("bookingId"));

    }, [])


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
                </Accordion>
            </div>
        </div>
    );
}

export default InventoryForm;
