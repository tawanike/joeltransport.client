import StorageStepper from "components/moves/storage-stepper.component";
import StorageCostCard from "components/moves/storageCostCard.component";
import CallMeBackButton from "components/shared/callMeBackButton.component";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { CoverImage } from "../../components/ui";

const Storage = () => {
  const [canConfirmMove, setCanConfirmMove] = useState(true);
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const goToCheckout = () => {
    if (canConfirmMove) {
      setShowSelectorModal(true);
    }
  };
  return (
    <div className="Resources container-fluid">
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
            <div className="col-6">
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

            <div className="col-5 offset-1">
              <StorageCostCard />
            </div>
            <div className="col-12 my-5 pt-3 moves__container__button-container">
              <div className="row w-100">
                <div className="col-2 offset-8">
                  <CallMeBackButton title="Call me back" />
                </div>
                <div className="col-2">
                  <div className="col-12">
                    <Button
                      disabled={!canConfirmMove}
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
    </div>
  );
};

export default Storage;
