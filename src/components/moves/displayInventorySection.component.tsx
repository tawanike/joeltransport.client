import { FC, useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import { IInventoryItem, IRoom } from "src/_models/types";
import InventoryItem from "./inventoryItem.component";

interface IProps {
  room: IRoom;
  inventoryItems: IInventoryItem[];
}
const DisplayInvemtorySection: FC<IProps> = ({ room, inventoryItems }) => {
  const [roomInventoryItems, setRoomInventoryItems] = useState<
    IInventoryItem[]
  >([]);
  const { state } = useContext(BookingContext);

  useEffect(() => {
    setRoomInventoryItems(
      inventoryItems.filter((item) => item.category === Number(room.id))
    );
  }, [inventoryItems]);

  const getTotals = (prev: number, curr: number) => {
    return prev + curr;
  };

  return (
    <Accordion.Item eventKey={room.id}>
      <Accordion.Header className="InventoryForm__display col-12">
        <div className="row w-100">
          <div className="col-8 InventoryForm__display__title">
            <p>{room.title}</p>
          </div>
          <div className="col-4 InventoryForm__display__count">
            {console.log("state.inventoryList", state.inventoryList)}
            <p>
              {" "}
              Items count(
              {state.inventoryList
                .filter((x) => x.room === Number(room.id))
                .map((x) => x.quantity)
                .reduce(getTotals, 0)}
              )
            </p>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <div className="Inventory__rooms--items">
          {roomInventoryItems.map((roomInventoryItem) => (
            <InventoryItem
              key={roomInventoryItem.id}
              item={roomInventoryItem}
              setRoomCounts={undefined}
            />
          ))}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default DisplayInvemtorySection;
