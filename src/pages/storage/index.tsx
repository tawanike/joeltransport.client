import StorageStepper from "components/moves/storage-stepper.component";
import StorageCostCard from "components/moves/storageCostCard.component";
import CallMeBackButton from "components/shared/callMeBackButton.component";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Modal,
  Overlay,
  Row,
  Tooltip,
} from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { BookingContext } from "src/_contexts/booking.context";
import { EDIT_ADDITIONAL_SERVICES, IBooking } from "src/_models/types";
import useAPI from "../../_hooks/useAPI";
import { CoverImage } from "../../components/ui";

const Storage = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [optionalServices, setOptionalServices] = useState<any[]>([]);
  const fetchWrapper = useAPI();
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const { state: bookingState, dispatch: dispatchBookings } =
    useContext(BookingContext);
  const [selectedServices, setSelectedServices] = useState([]);

  const targets: any = {
    insurance: useRef(null),
    "packing-service": useRef(null),
    "packing-material": useRef(null),
    "specialised-moving-services": useRef(null),
  };

  const goToCheckout = () => {
    setShowSelectorModal(true);
  };

  const saveAndContinue = () => {
    router.push(`/move/checkout`);
  };

  const isDisabled = (state: IBooking) => {
    const objKeys = Object.keys(state.formValues);
    let userVals = true;
    const formVals = ["move_date"].some((x) => {
      const xVal = state.formValues[x as keyof typeof state.formValues];
      return (
        xVal === null ||
        xVal === "" ||
        xVal === false ||
        xVal === 0 ||
        xVal?.length === 0 ||
        xVal === undefined
      );
    });
    if (state.formValues.user) {
      userVals = ["first_name", "last_name", "email", "phone_number"].some(
        (x) => {
          const xVal =
            state.formValues.user[x as keyof typeof state.formValues.user];
          return (
            xVal === null ||
            xVal === "" ||
            xVal?.length === 0 ||
            xVal === undefined
          );
        }
      );
    }
    return formVals || userVals;
  };

  useEffect(() => {
    const getOptionalServices = async () => {
      const optionalServices = await fetchWrapper.get(
        "/products/optional-services",
        false
      );
      setOptionalServices(optionalServices.results);
    };
    getOptionalServices();
  }, []);

  const selectService = async (e: any) => {
    dispatchBookings({
      type: EDIT_ADDITIONAL_SERVICES,
      payload: { [e.target.name]: e.target.checked },
    });

    await fetchWrapper.post(
      `/bookings/${bookingState.formValues.id}/products/addons`,
      {
        booking: bookingState.formValues.id,
        product: e.target.value,
        category: 0,
        selected: e.target.checked,
      }
    );
  };

  return (
    <div className="Resources container-fluid">
      <Modal
        show={showSelectorModal}
        onHide={() => setShowSelectorModal(false)}
      >
        <Modal.Body>
          <div className="col-12 custom-modal" style={{ padding: 0 }}>
            <div
              className="custom-modal__header"
              style={{ padding: 12, position: "relative" }}
            >
              <h3>We have additional moving services should you need </h3>
              <p>
                Select one or more of below services and our sales team will
                contact you.
              </p>
            </div>
            <div className="col-12 custom-modal__body" style={{ padding: 12 }}>
              {optionalServices.map((service) => (
                <Row key={service.id}>
                  <Col sm={9} md={10} className="mt-3">
                    <Form.Check
                      label={service.title}
                      name={service.slug}
                      type="checkbox"
                      value={service.id}
                      id={service.id}
                      className="radioBtn"
                      onChange={selectService}
                    />
                  </Col>
                  <Col
                    sm={3}
                    md={2}
                    className="mt-3"
                    ref={targets[service.slug]}
                  >
                    <BsInfoCircle
                      onClick={() => {
                        setShow(service.id);
                      }}
                    />
                    <Overlay
                      target={targets[service.slug]?.current}
                      show={show === service.id}
                      placement="right"
                    >
                      {(props) => (
                        <Tooltip id={service.id} {...props}>
                          {service.description}
                        </Tooltip>
                      )}
                    </Overlay>
                  </Col>
                </Row>
              ))}
            </div>

            <div
              className="row pb-3 mb-3 mt-3 custom-modal__footer"
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <div className="col-12 d-flex justify-content-end">
                <Button
                  disabled={!selectedServices}
                  className=""
                  onClick={saveAndContinue}
                  variant="secondary"
                >
                  Continue
                </Button>
              </div>
            </div>

            <Alert variant="info" className="mt-3" style={{ padding: 8 }}>
              <div className="row">
                <div
                  className="col-1"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  <FcInfo />
                </div>
                <div className="col-11" style={{ fontSize: 12 }}>
                  <b>Please note:</b> There may be additional charges. Terms and
                  conditions apply.
                </div>
              </div>
            </Alert>
          </div>
        </Modal.Body>
      </Modal>
      <CoverImage
        size="medium"
        src="/img/storage.png"
        pageTitle="Storage unit"
        description="We offer secure storage facilities for our customers, that suit specific requirements."
      />

      <div className="Resources__documents">
        <div className="moves__container container mt-5">
          <div className="row">
            <div className="col-12 mb-5">
              <h2>Get a storage unit for your items</h2>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-6 moves__container__thumbnail">
                  <img src="/img/storage_thumb.png" alt="storage" />
                </div>
                <div className="col-6 moves__container__summary">
                  <div>
                    <p>
                      <b>Storage type: wooden crate unit </b>
                    </p>
                    <p>
                      <b>Storage units size: 6 m2</b>
                    </p>
                    <p className="price">
                      <span>R350 pm</span> excl.VAT
                    </p>
                    <p>
                      Each storage unit can fit items in a one-bedroom bachelor
                      apartment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12">
                  <StorageStepper />
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 offset-lg-1">
              <StorageCostCard />
            </div>
            <div className="col-12 my-5 pt-3 moves__container__button-container">
              <div className="row w-100">
                <div className="col-12 d-flex justify-content-end">
                  <CallMeBackButton title="Call me back" />
                  <Button
                    disabled={isDisabled(bookingState)}
                    onClick={goToCheckout}
                    variant="secondary"
                  >
                    Confirm move
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
