import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { articleConfig } from "../../_configurations/products.config";

const RelatedArticles = () => {
  const router = useRouter();
  return (
    <>
      <div className="resources__documents container">
        <div className="row">
          <div className="resources__section-header col-12 mt-5">
            <h2>Related articles</h2>
          </div>
          <div className="resources__products-summary col-12 mt-5">
            <div className="row">
              {articleConfig.map((article) => (
                <>
                  <div
                    key={article.id}
                    className="resources__products-summary__product-container col-4 mb-3"
                  >
                    <div className="resources__products-summary__product col-12">
                      <div className="row">
                        <div className="col-12 resources__products-summary__product__information">
                          <div className="row">
                            <div className="resources__products-summary__product__information-head col-12">
                              <p>{article.title}</p>
                            </div>
                            <div className="resources__products-summary__product__information-summary col-12 my-3">
                              <p>{article.description}</p>
                            </div>
                            <div className="resources__products-summary__product__information-button col-12">
                              <Button
                                variant="link"
                                onClick={() =>
                                  router.push(`/resources/articles`)
                                }
                                style={{ position: "absolute", bottom: 10 }}
                              >
                                {article.cta} <BsArrowRight />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedArticles;
