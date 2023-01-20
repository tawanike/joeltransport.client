import { default as Card } from './ServiceCard';
import { servicesConfig } from '../../_configurations/services.config';

const Offer = () => {
    return (
        <div className="Offer container">
            <h1>What we offer</h1>
            <div className="Offer__usp">
                <p>You can store your goods in our storage, and order them to be shipped at separate times to your desired location</p>
            </div>
            <div className="row d-flex justify-content-between">
                {servicesConfig.map((service) => <Card key={service.id} {...service} />)}
            </div>
        </div>
    )
}

export default Offer;
