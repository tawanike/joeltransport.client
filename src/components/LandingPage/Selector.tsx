
import ContactUsModal from 'components/Contacts/contactUsModal.component';
import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc';
import { SelectorConfig, selectorConfig } from '../../_configurations/selectors.config';
import HomeMoveModalComponent from './homeMoveModal.component';
import StorageModalComponent from './storageModal.component';

const Selector = () => {
    const [selectedView, setSelectedView] = useState(() => selectorConfig[0]);
    const [showSelectorModal, setShowSelectorModal] = useState(false);
    const [showStorageModal, setShowStorageModal] = useState(false);
    const [showContactUsModal, setShowContactUsModal] = useState(false);
    const [view, setView] = useState<"move" | "storage">("move")

    const toggleMoveModal = (state: boolean) => setShowSelectorModal(state)
    const toggleStorageModal = (state: boolean) => {
        console.log(state);

        setShowStorageModal(state)
        setShowContactUsModal(!state);
    }

    const toggleContactUsModal = (state: boolean) => setShowContactUsModal(state);

    return (
        <div className="selectorContainer container">
            <HomeMoveModalComponent showSelectorModal={showSelectorModal} setShowSelectorModal={toggleMoveModal} />
            <StorageModalComponent showStorageModal={showStorageModal} setShowStorageModal={toggleStorageModal} />
            <ContactUsModal showContactUsModal={showContactUsModal} setShowContactUsModal={toggleContactUsModal} />
            <div className="Selector__options">
                {
                    selectorConfig.map((selector: SelectorConfig) =>
                        <Button
                            key={selector.id}
                            variant={`${selectedView.id === selector.id ? "primary" : "outline-primary"}`}
                            className="Selector__button"
                            onClick={() => setSelectedView(selector)}
                        >
                            {selector.title}
                        </Button>
                    )
                }
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
                            selectedView.title === "Home Move" ? toggleMoveModal(true) : toggleStorageModal(true)
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
