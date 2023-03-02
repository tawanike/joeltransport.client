import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import useAPI from "src/_hooks/useAPI";
import InventoryItem from "./inventoryItem.component";

type Props = {};

function InventoryForm({}: Props) {
  const api = useAPI();
  const [roomCounts, setRoomCounts] = useState<any>({});
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [selectedInventoryItems, setSelectedInventoryItems] = useState<any[]>(
    []
  );

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

  useEffect(() => {
    const selected = inventoryItems.filter((item) => {
      console.log(item.category, selectedRoom);
      if (item.category == selectedRoom?.id) {
        return item;
      }
    });
    setSelectedInventoryItems(selected);
  }, [selectedRoom, inventoryItems]);

  return (
    <div className="InventoryForm">
      <div className="Inventory__rooms">
        <Accordion>
          {rooms.map((room) => (
            <Accordion.Item eventKey={room.id} key={room.id}>
              <Accordion.Header onClick={() => setSelectedRoom(room)}>
                <div className="row">
                  <div className="col-md-7" style={{ width: "60% !important" }}>
                    {room.title}
                  </div>
                  <div className="col-md-5 text-right" style={{ width: "40%" }}>
                    Items count(0)
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="Inventory__rooms--items">
                  {selectedInventoryItems.map((roomInventoryItem) => (
                    <InventoryItem
                      key={roomInventoryItem.id}
                      item={roomInventoryItem}
                      setRoomCounts={setRoomCounts}
                    />
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default InventoryForm;
