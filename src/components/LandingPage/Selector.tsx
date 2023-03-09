import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { updateBooking } from "src/_actions/booking.actions";
import { BookingContext } from "src/_contexts/booking.context";
import {
  SelectorConfig,
  selectorConfig,
} from "../../_configurations/selectors.config";
import HomeMoveModalComponent from "./homeMoveModal.component";
import StorageModalComponent from "./storageModal.component";

const Selector = () => {
  const [selectedView, setSelectedView] = useState(() => selectorConfig[0]);
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [view, setView] = useState<"move" | "storage">("move");
  const { state: bookingState, dispatch: bookingsDispatch } =
    useContext(BookingContext);

  const toggleMoveModal = (state: boolean) => setShowSelectorModal(state);
  const toggleStorageModal = (state: boolean) => {
    setShowStorageModal(state);
  };

  return (
    <div className="selectorContainer container">
      <HomeMoveModalComponent
        showSelectorModal={showSelectorModal}
        setShowSelectorModal={toggleMoveModal}
      />
      <StorageModalComponent
        showStorageModal={showStorageModal}
        setShowStorageModal={toggleStorageModal}
      />
      <div className="Selector__options">
        {selectorConfig.map((selector: SelectorConfig) => (
          <Button
            key={selector.id}
            variant={`${
              selectedView.id === selector.id ? "primary" : "outline-primary"
            }`}
            className="Selector__button"
            onClick={() => setSelectedView(selector)}
          >
            {selector.title}
          </Button>
        ))}
      </div>
      <div className="Selector__instructions row">
        <div className="col-12 col-md-9 Selector__instructions__text">
          <div>
            <h4>{selectedView.heading}</h4>
          </div>
        </div>
        <div className="col-12 col-md-3 Selector__instructions__get-started">
          <button
            className="button button-secondary"
            onClick={() => {
              selectedView.title === "Home Move"
                ? toggleMoveModal(true)
                : toggleStorageModal(true);
              selectedView.title === "Home Move"
                ? bookingsDispatch(
                    updateBooking({ move_type: 0, self_delivery: 0 })
                  )
                : bookingsDispatch(updateBooking({ move_type: 1 }));
            }}
          >
            Get a quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selector;
