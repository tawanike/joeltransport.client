import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { BsArrowRight, BsListCheck, BsShieldFillCheck } from 'react-icons/bs';
import RelatedArticles from '../../components/Resources/relatedArticles.component';
import { CoverImage } from '../../components/ui';

export default function Resources() {
    return (
        <div className="resources container-fluid">
            <CoverImage
                size="medium"
                src="/img/services/resources_banner.png"
                pageTitle='Resources & articles'
                description='Download documents and or view our certifications'
            />

            <div className="resources__documents">
                <div className="resources__documents container mt-5">
                    <div className="row">
                        <div className="resources__product-description col-12">
                            <div className="row">
                                <div className="resources__product-description__summary col-6">
                                    <div className="resources__product-description__summary__information-head">
                                        <p>Resourceful documents</p>
                                    </div>
                                    <div className="resources__product-description__summary__information-summary">
                                        We are industry compliance for both local and international moving and storage services.
                                    </div>
                                    <div className="resources__product-description__summary__information-button py-3">
                                        {
                                            <Button variant="link">Call me back <BsArrowRight /></Button>
                                        }
                                    </div>
                                </div>
                                <div className="resources__downloads col-6">
                                    <ul className="row">
                                        <li className="col-6 resources__downloads__outline mb-5">
                                            <div className="row">
                                                <div className="col-12 resources__downloads__outline__icon">
                                                    <div className="icon-container">
                                                        <BsListCheck />
                                                    </div>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__head my-1">
                                                    <p>Inventory check list</p>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__summary">
                                                    <p>We have provided an excel document to help with your move.</p>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__button">
                                                    <Button variant="link">Download</Button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-6 resources__downloads__outline mb-5">
                                            <div className="row">
                                                <div className="col-12 resources__downloads__outline__icon">
                                                    <div className="icon-container">
                                                        <BsShieldFillCheck />
                                                    </div>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__head my-1">
                                                    <p>Certification</p>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__summary">
                                                    <p>We are trusted and compliance with RFA. </p>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__button">
                                                    <Button variant="link">Download</Button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="col-6 resources__downloads__outline mb-5">
                                            <div className="row">
                                                <div className="col-12 resources__downloads__outline__icon">
                                                    <div className="icon-container">
                                                        <BsShieldFillCheck />
                                                    </div>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__head my-1">
                                                    <p>Certification</p>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__summary">
                                                    <p>We are trusted and compliant with Amosa. </p>
                                                </div>
                                                <div className="col-12 resources__downloads__outline__button">
                                                    <Button variant="link">Download</Button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RelatedArticles />
            </div>
        </div>
    )
}
