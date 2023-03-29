import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

function Hero() {
    const router = useRouter();
    return (
        <div className="hero">
            <div className="hero__overlay">
                <div className="container d-flex justify-contents-start">
                    <div className="row">
                        <div className="col-12 col-md-6 justify-contents-start">
                            <h1 className="col-12">Moving. It’s mayhem! Fortunately, we can handle it</h1>
                            <h4 className="col-12">We’re the experts of stress-free moving. Chat to us about how we can simplify your moving process.

                                Get your free quote now.</h4>
                            <div className="col-12 d-flex justify-contents-start mt-4">
                                <Button variant="primary" onClick={() => router.push("/services")} className="">Learn more</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero
