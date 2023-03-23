import Image from "next/image";
import { Button } from "react-bootstrap";

function Hero() {
    return (
        <div className="hero">
            {/* <img src="/img/landing_overlay.png" alt="" /> */}
            <div className="hero__overlay">
                <div className="container d-flex justify-contents-start">
                    <div className="row">
                        <div className="col-12 col-md-6 justify-contents-start">
                            <h1 className="col-12">Get your free quote now
                                for your move if you are
                                within Gauteng</h1>
                            <h4 className="col-12">If you are outside Gauteng, provide us with your
                                contact information and a specialist will be in touch.</h4>
                            <div className="col-12 d-flex justify-contents-start mt-4">
                                <Button variant="primary" className="">Learn more</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero
