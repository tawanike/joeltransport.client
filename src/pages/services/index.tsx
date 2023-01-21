import { Button } from 'react-bootstrap';
import { CoverImage } from '../../components/ui';
import { articleConfig, productConfig } from '../../_configurations/products.config';
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from 'next/router'

const Resources = () => {
    const router = useRouter();
    return (
        <div className="resources container-fluid">
            <CoverImage
                size="medium"
                src="/img/kaleb.png"
                pageTitle='Services'
                description='Meet the experts in moving and storage'
            />
            <div className="row">
                <div className="resources__documents container">
                    <div className="row">
                        <div className="resources__section-header col-12 mb-3">
                            <h2>Our products & services</h2>
                        </div>
                        <div className="resources__products-summary col-12">
                            <div className="row">
                                {productConfig.map(product => <>
                                    <div key={product.id} className="resources__products-summary__product-container col-4 mb-3">
                                        <div className="resources__products-summary__product col-12">
                                            <div className="row">
                                                <div className="col-7 resources__products-summary__product__information">
                                                    <div className="row">
                                                        <div className="resources__products-summary__product__information-head col-12">
                                                            <p>{product.title}</p>
                                                        </div>
                                                        <div className="resources__products-summary__product__information-summary col-12">
                                                            <p>{product.description}</p>
                                                        </div>
                                                        <div className="resources__products-summary__product__information-button col-12">
                                                            <Button
                                                                variant='outline-secondary'
                                                                onClick={() => router.push(`/services/${product.route}`)}
                                                            >Tell me more</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-5 resources__products-summary__product__image">
                                                    <img src={`/img/services/${product.image}`} alt={`${product.title}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                )}
                            </div>
                        </div>
                        <div className="resources__section-header col-12 my-5">
                            <h2>Here are some related articles</h2>
                        </div>
                        <div className="resources__products-summary col-12 mb-5">
                            <div className="row">
                                {articleConfig.map(product => <>
                                    <div key={product.id} className="resources__products-summary__product-container col-4 mb-3">
                                        <div className="resources__products-summary__product col-12">
                                            <div className="row">
                                                <div className="col-12 resources__products-summary__product__information">
                                                    <div className="row">
                                                        <div className="resources__products-summary__product__information-head col-12">
                                                            <p>{product.title}</p>
                                                        </div>
                                                        <div className="resources__products-summary__product__information-summary col-12 my-3">
                                                            <p>{product.description}</p>
                                                        </div>
                                                        <div className="resources__products-summary__product__information-button col-12">
                                                            <Button variant='link'>Tell me more <BsArrowRight /></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resources;
