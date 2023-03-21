import MoveStepper from "components/moves/move-stepper.component";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { FcInfo } from "react-icons/fc";
import { BookingContext } from "src/_contexts/booking.context";
import useAPI from "../../_hooks/useAPI";
import {
  ADD_FORM_VALUES,
  ADD_PRODUCTS_DATA,
  EDIT_ADDITIONAL_SERVICES,
} from "../../_models/types";
import { productService } from "../../_services/product.service";
import MoveCostCard from "../../components/moves/moveCostCard.component";
import CallMeBackButton from "../../components/shared/callMeBackButton.component";
import { CoverImage } from "../../components/ui";

const DomesticMoveServices = () => {
  const [optionalServices, setOptionalServices] = useState<any[]>([]);
  const [canConfirmMove, setCanConfirmMove] = useState(true);
  const fetchWrapper = useAPI();
  const { state: bookingState, dispatch: dispatchBookings } =
    useContext(BookingContext);
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      const products = await productService.getProducts(fetchWrapper);
      dispatchBookings({ type: ADD_PRODUCTS_DATA, payload: products.results });
    };

    const getOptionalServices = async () => {
      const optionalServices = await fetchWrapper.get(
        "/products/optional-services",
        false
      );
      setOptionalServices(optionalServices.results);
    };

    dispatchBookings({
      type: ADD_FORM_VALUES,
      payload: { move_type: 0 },
    });

    getProducts();
    getOptionalServices();
  }, []);

  const goToCheckout = () => {
    if (!canConfirmMove) {
      setShowSelectorModal(true);
    }
  };

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

  const saveAndContinue = () => {
    router.push(`/move/checkout`);
  };

  useEffect(() => {
    const canConfirmMove = Object.entries(bookingState.formValues).map(
      ([key, value]) => {
        if (["move_date"].includes(key)) {
          return (
            value === null ||
            value === "" ||
            value === false ||
            value === 0 ||
            value.length === 0
          );
        }
        if (key === "user") {
          return Object.keys(value).some(
            (x) => value[x] === null || value[x] === ""
          );
        }
        return false;
      }
    );
    setCanConfirmMove(canConfirmMove.filter(Boolean).length > 0);
  }, [bookingState.formValues]);

  return (
    <>
      <div className="moves container-fluid">
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
              <div
                className="col-12 custom-modal__body"
                style={{ padding: 12 }}
              >
                {optionalServices.map((service) => (
                  <Form.Check
                    key={service.id}
                    label={service.title}
                    name={service.slug}
                    type="checkbox"
                    value={service.id}
                    id={service.id}
                    className="radioBtn"
                    onChange={selectService}
                  />
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
                    <b>Please note:</b> There may be additional charges. Terms
                    and conditions apply.
                  </div>
                </div>
              </Alert>
            </div>
          </Modal.Body>
        </Modal>
        <CoverImage
          size="medium"
          src="/img/kaleb.png"
          pageTitle="Move Services"
          description="Meet the experts in moving and storage"
        />
        <div className="moves__container container mt-5">
          <div className="row">
            <div className="col-12 mb-5">
              <h2>Book a home move</h2>
            </div>
            <div className="col-12 col-md-7">
              <MoveStepper />
            </div>
            <div className="col-12 col-md-4 offset-md-1">
              <MoveCostCard />
            </div>
            <div className="col-12 my-5 pt-3 moves__container__button-container">
              <div className="row w-100">
                <div className="col-12 d-flex justify-content-end">
                  <CallMeBackButton title="Call me back" />
                  <Button
                    disabled={canConfirmMove}
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
    </>
  );
};

export default DomesticMoveServices;
