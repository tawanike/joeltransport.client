import { default as Card } from './ServiceCard';
import { servicesConfig } from '../../_configurations/services.config';

const Offer = () => {
    return (
        <div className="Offer container">
            <h1>What we offer</h1>
            <div className="Offer__usp">
                <p>We keep your belongings in quality storage facilities. These are shipped to your desired location at separate times.</p>
            </div>
            <div className="row d-flex justify-content-between">
                {servicesConfig.map((service) => <Card key={service.id} {...service} />)}
            </div>
        </div>
    )
}

export default Offer;
