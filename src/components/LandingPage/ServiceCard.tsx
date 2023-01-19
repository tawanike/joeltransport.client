import React from 'react'

type ServiceCardProps = {
    image: string;
    title: string;
    description: string;
    link: string;
    bgColor: string;
}

function ServiceCard({ image, title, description, link, bgColor}: ServiceCardProps) {
  return (
    <div className="ServiceCard col-12 col-md-4 m-3">
        <div className="ServiceCard__header">
            <div className='ServiceCard__icon' style={{ backgroundColor: bgColor }}>Icon</div>
            <h3>What we offer</h3>
        </div>
        <div className="ServiceCard__content">
          You can store your goods in our storage, and order them to be shipped at separate times to your desired location.
        </div>

        <button className="button button-secondary">Get moving</button>
    </div>
  )
}

export default ServiceCard;
