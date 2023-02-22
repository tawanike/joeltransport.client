import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import useAPI from 'src/_hooks/useAPI';
import InventoryItem from './inventoryItem.component';


type Props = {}

function InventoryForm({ }: Props) {
    const api = useAPI();
    const [rooms, setRooms] = useState<any[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<any>();
    const [inventoryItems, setInventoryItems] = useState<any[]>([]);
    const [selectedInventoryItems, setSelectedInventoryItems] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const roomsResponse = await api.get('/categories/3/subcategories', undefined);
            setRooms(roomsResponse.results);
            const inventoryItemsResponse = await api.get('/inventory', undefined);
            setInventoryItems(inventoryItemsResponse.results);

        })();
    }, []);

    useEffect(() => {
        const selected = inventoryItems.filter(item => {
            console.log(item.category, selectedRoom)
            if (item.category == selectedRoom) {
                return item;
            }
        })
        setSelectedInventoryItems(selected)
    }, [selectedRoom, inventoryItems]);

    return (
        <div className="InventoryForm">
            <div className="Inventory__rooms">
                <Nav
                    variant="pills"
                    onSelect={(room) => setSelectedRoom(room)}>
                    {rooms.map(room => <Nav.Item key={room.id}>
                        <Nav.Link eventKey={room.id}>{room.title}</Nav.Link>
                    </Nav.Item>)}
                </Nav>
            </div>
            <div className="Inventory__rooms--items">
                {selectedInventoryItems.map(roomInventoryItem =>
                    <InventoryItem key={roomInventoryItem.id} item={roomInventoryItem} />)}
            </div>
        </div>
    )
}

export default InventoryForm;
