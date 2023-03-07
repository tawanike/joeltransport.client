import { FC, useContext, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { ADD_FORM_VALUES } from "src/_models/types";
interface IProps {}

const addedServices = [
  { id: 1, title: "Moving Survey", value: "moving_survey" },
  { id: 2, title: "Packing Material", value: "packing_material" },
  { id: 3, title: "Packing Service", value: "packing_service" },
  { id: 4, title: "Insurance", value: "insurance" },
  { id: 5, title: "Crating", value: "crating" },
  { id: 6, title: "Storage", value: "storage" },
  { id: 7, title: "Bakkie shuttle", value: "requires_bakkie_shuttle" },
  {
    id: 8,
    title:
      "Free Gauteng removal of unused furniture, appliances, clothing & linen",
    value: "gauteng_removal",
  },
  {
    id: 9,
    title: "International moving services",
    value: "international_moving_services",
  },
  { id: 10, title: "Other", value: "other" },
];

const AddedServices: FC<IProps> = ({}) => {
  const api = useAPI();
  const { state: bookingState, dispatch: bookingDispatch } =
    useContext(BookingContext);
  const handleSelect = (item: any) => {
    bookingDispatch({
      type: ADD_FORM_VALUES,
      payload: { [item.target.value]: item.target.checked },
    });
  };

  useEffect(() => {
    const getAddedServices = async () => {
      const results = await api.get("/products?category=3", false);
      if (results) {
        console.log(results);
      }
    };

    getAddedServices();
  }, []);

  return (
    <>
      <Row className="InventoryItem mb-4">
        {addedServices.map((item) => (
          <Col key={item.id} sm={12} className="mt-3">
            <Form.Check
              type="checkbox"
              label={item.title}
              id={String(item.id)}
              value={item.value}
              onChange={handleSelect}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AddedServices;
