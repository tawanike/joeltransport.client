import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SelectorConfig, selectorConfig } from '../../_configurations/selectors.config';
import { useRouter } from 'next/router';

const Selector = () => {
    const router = useRouter();
    const [selectedView, setSelectedView] = useState(() => selectorConfig[0]);
    const [showSelectorModal, setShowSelectorModal] = useState(false)
    const [selectedService, setSelectedService] = useState<string | null>(null)

    const selectService = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedService(e.target.value);
    }

    const handleNext = () => {
        router.push(`/move/${selectedService}`);
        setShowSelectorModal(false);
    }

    return (
        <div className="selectorContainer container">
            <Modal show={showSelectorModal} onHide={() => setShowSelectorModal(false)}>
                <Modal.Body>
                    <div className="col-12 custom-modal">
                        <div className="custom-modal__header">
                            <h3>Are you based in south Africa, Gauteng province? </h3>
                            <p>How would you like to proceed?</p>
                        </div>
                        <div className="col-12 custom-modal__body">
                            <Form.Check
                                label="Yes, i’m in Gauteng"
                                name="move_type"
                                type="radio"
                                value="domestic"
                                id="move_type_1"
                                className='radioBtn'
                                onChange={selectService}
                            />
                            <Form.Check
                                label="No, i’m outside Gauteng province. "
                                name="move_type"
                                value="international"
                                type="radio"
                                id="move_type_2"
                                className='radioBtn'
                                onChange={selectService}
                            />
                        </div>

                        <div className="col-12 custom-modal__footer">
                            <Button
                                onClick={handleNext}
                                disabled={!selectedService}
                                className="w-100"
                                variant="secondary">
                                Next
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
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
                        {/* <p>{selectedView.description}</p> */}
                    </div>
                </div>
                <div className="col-12 col-md-3 Selector__instructions__get-started">
                    <button
                        className='button button-secondary'
                        onClick={() => setShowSelectorModal(true)}
                    >Get a quote</button>
                </div>
            </div>
        </div>
    )
}

export default Selector;
