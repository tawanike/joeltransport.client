import { servicesConfig } from "../../_configurations/services.config";
import { default as Card } from "./ServiceCard";

const Offer = () => {
  return (
    <div className="Offer container">
      <h1>What we offer</h1>
      <div className="Offer__usp">
        <p>
          We are an experienced, accredited, and professional moving and storage
          company that delivers stress-free services.{" "}
        </p>
      </div>
      <div className="row d-flex justify-content-between">
        {servicesConfig.map((service) => (
          <Card key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Offer;
