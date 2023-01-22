import { Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { articleConfig } from "../../_configurations/products.config";

const RelatedArticles = () => {
    return <>
        <div className="resources__documents container">
            <div className="row">
                <div className="resources__section-header col-12 mt-5">
                    <h2>Here are some related articles</h2>
                </div>
                <div className="resources__products-summary col-12 mt-5">
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
    </>
}

export default RelatedArticles;
