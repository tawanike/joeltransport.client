import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsClock, BsFillExclamationSquareFill } from "react-icons/bs";
import CoverImage from "../../components/ui/CoverImage";

const CareerPage = () => {
    const [opps, setOpps] = useState(false);
    return (
        <>
            <div className="resources container-fluid">
                <CoverImage
                    size="medium"
                    src="/img/services/resources_banner.png"
                    pageTitle="Careers"
                    description="About careers at Joel Transport"
                    variant="--resources"
                />

                <div className="resources__career container mt-5">
                    {opps ? (
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="mb-3">Open positions</h2>
                                    <p>We are looking for smart motivated people</p>
                                </div>
                                <div className="col-12 resources__careerEntry mt-5">
                                    <div className="col-12">
                                        <div className="row p-4">
                                            <div className="col-12 resources__careerEntry__head mb-4">
                                                <h4>Code 14 truck driver</h4>
                                            </div>
                                            <div className="col-12 resources__careerEntry__text mb-4">
                                                <p>
                                                    JOB SUMMARY: Germiston Code 14 drivers are required
                                                    for Centurion PDP or dangerous goods/ 3 years exp
                                                    Matric R70 hourly rate.
                                                </p>
                                            </div>
                                            <div className="col-9 resources__careerEntry__fulltime">
                                                <p>
                                                    <span className="clock">
                                                        <BsClock />
                                                    </span>{" "}
                                                    Full time
                                                </p>
                                            </div>
                                            <div className="col-3 resources__careerEntry__apply">
                                                <Button
                                                    variant="link"
                                                    onClick={() => {
                                                        const win: Window = window;
                                                        win.location = "https://www.joeltransport.co.za";
                                                    }}
                                                >
                                                    Apply now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 resources__careerEntry mt-5">
                                    <div className="col-12">
                                        <div className="row p-4">
                                            <div className="col-12 resources__careerEntry__head mb-4">
                                                <h4>Code 14 truck driver</h4>
                                            </div>
                                            <div className="col-12 resources__careerEntry__text mb-4">
                                                <p>
                                                    JOB SUMMARY: Germiston Code 14 drivers are required
                                                    for Centurion PDP or dangerous goods/ 3 years exp
                                                    Matric R70 hourly rate.
                                                </p>
                                            </div>
                                            <div className="col-9 resources__careerEntry__fulltime">
                                                <p>
                                                    <span className="clock">
                                                        <BsClock />
                                                    </span>{" "}
                                                    Full time
                                                </p>
                                            </div>
                                            <div className="col-3 resources__careerEntry__apply">
                                                <Button
                                                    variant="link"
                                                    onClick={() => {
                                                        const win: Window = window;
                                                        win.location = "https://www.joeltransport.co.za";
                                                    }}
                                                >
                                                    Apply now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="col-8 offset-2 resources__emptyCareers p-5"
                                onClick={() => setOpps(!opps)}
                            >
                                <div className="col-12 resources__modal__icon danger">
                                    <BsFillExclamationSquareFill />
                                </div>
                                <div className="col-12 resources__modal__head mt-4">
                                    <h3>There are no current openings</h3>
                                </div>
                                <div className="col-8 offset-2 resources__modal__text mt-4">
                                    <p>
                                        Thank you for your interest, but there are no job openings
                                        available at this time. Please check back at another time
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CareerPage;
