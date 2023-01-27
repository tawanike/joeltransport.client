import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { SelectorConfig, selectorConfig } from '../../_configurations/selectors.config';
import { useRouter } from 'next/router';

const Selector = () => {
    const router = useRouter();
    const [selectedView, setSelectedView] = useState(() => selectorConfig[0]);
    return (
        <div className="selectorContainer container">
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
                        <p>{selectedView.description}</p>
                    </div>
                </div>
                <div className="col-12 col-md-3 Selector__instructions__get-started">
                    <button
                        className='button button-secondary'
                        onClick={() => router.push(selectedView.route)}
                    >Get started</button>
                </div>
            </div>
        </div>
    )
}

export default Selector;
