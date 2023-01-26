import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react'
import { ServiceConfig } from '../../_configurations/services.config';

const ServiceCard: FC<ServiceConfig> = ({ image, title, description, link, bgColor, icon }) => {
    const router = useRouter();
    return (
        <div className=" col-12 col-md-4 mt-3">
            <div className=" ServiceCard col-12">
                <div className="ServiceCard__header">
                    <div className={`ServiceCard__icon ServiceCard__icon--${bgColor}`}>{icon}</div>
                    <h3>{title}</h3>
                </div>
                <div className="ServiceCard__content py-4">
                    {description}
                </div>
                <button className="button button-secondary" onClick={() => router.push(`${link}`)}>Get moving</button>
            </div>
        </div>
    )
}

export default ServiceCard;
