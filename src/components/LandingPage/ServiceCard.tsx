import React, { FC, ReactNode } from 'react'
import { ServiceConfig } from '../../_configurations/services.config';

const ServiceCard: FC<ServiceConfig> = ({ image, title, description, link, bgColor, icon }) => {
    return (
        <div className=" col-12 col-md-4 mt-3">
            <div className=" ServiceCard col-12">
                <div className="ServiceCard__header">
                    <div className={`ServiceCard__icon ServiceCard__icon--${bgColor}`}>{icon}</div>
                    <h3>What we offer</h3>
                </div>
                <div className="ServiceCard__content">
                    You can store your goods in our storage, and order them to be shipped at separate times to your desired location.
                </div>
                <button className="button button-secondary">Get moving</button>
            </div>
        </div>
    )
}

export default ServiceCard;
