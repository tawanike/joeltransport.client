import { FC, useContext, useEffect, useRef, useState } from "react";
import { Col, Form, Overlay, Row, Tooltip } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
interface IProps {}

const AddedServices: FC<IProps> = ({}) => {
  const api = useAPI();
  const targets: any = {
    "bakkie-shuttle": useRef(null),
    "fine-art": useRef(null),
    insurance: useRef(null),
    "packing-service": useRef(null),
    "packing-material": useRef(null),
    "vehicle-transportation": useRef(null),
    "pet-relocation-services": useRef(null),
    "international-moving-services": useRef(null),
    "moving-survey": useRef(null),
    "free-gauteng-removal-of-unused-furniture-appliances-clothing-linen":
      useRef(null),
    "piano-moving-services": useRef(null),
    crating: useRef(null),
    storage: useRef(null),
  };
  const [show, setShow] = useState(false);
  const [addons, setAddons] = useState<any[]>([]);
  const { state: bookingState, dispatch: bookingDispatch } =
    useContext(BookingContext);

  const handleSelect = async (item: any) => {
    const currentAddons = bookingState.formValues.addOns || [];
    if (currentAddons.includes(item.target.value)) {
      const index = currentAddons.indexOf(item.target.value);
      if (index > -1) {
        currentAddons.splice(index, 1);
      }
    } else {
      currentAddons.push(item.target.value);
    }

    bookingDispatch({
      type: "ADD_FORM_VALUES",
      payload: {
        addOns: currentAddons,
      },
    });

    await api.post(`/bookings/${bookingState.formValues.id}/products/addons`, {
      booking: bookingState.formValues.id,
      product: item.target.value,
      category: 0,
      selected: item.target.checked,
    });
  };

  useEffect(() => {
    const getAddedServices = async () => {
      const results = await api.get("/products/addons", false);
      if (results) {
        setAddons(results.results);
      }
    };

    getAddedServices();
  }, []);

  return (
    <>
      <Row className="InventoryItem mb-4">
        {addons &&
          addons.map((item) => (
            <Row key={item.id}>
              <Col sm={9} md={10} className="mt-3">
                <Form.Check
                  type="checkbox"
                  label={item.title}
                  id={String(item.id)}
                  value={item.id}
                  onChange={handleSelect}
                  checked={bookingState.formValues?.addOns?.includes(item.id)}
                />
              </Col>
              <Col sm={3} md={2} className="mt-3" ref={targets[item.slug]}>
                <BsInfoCircle
                  onClick={() => {
                    setShow(item.id);
                  }}
                />
                <Overlay
                  target={targets[item.slug]?.current}
                  show={show === item.id}
                  placement="right"
                >
                  {(props) => (
                    <Tooltip id={item.id} {...props}>
                      {item.description}
                    </Tooltip>
                  )}
                </Overlay>
              </Col>
            </Row>
          ))}
      </Row>
    </>
  );
};

export default AddedServices;
