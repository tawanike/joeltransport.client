import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { BsArrowRight, BsListCheck, BsShieldFillCheck } from "react-icons/bs";
import RelatedArticles from "../../components/Resources/relatedArticles.component";
import { CoverImage } from "../../components/ui";

export default function Resources() {
  const router = useRouter();
  return (
    <div className="resources">
      <CoverImage
        size="medium"
        src="/img/services/resources_banner.png"
        pageTitle="Resources and articles"
        description="Everything you need to know"
        variant="--resources"
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
                    We follow industry standards for both local and
                    international moving/ storage services.
                  </div>
                  <div className="resources__product-description__summary__information-button py-3">
                    {
                      <Button
                        variant="link"
                        onClick={() => router.push("/contact-us")}
                      >
                        Call me back <BsArrowRight />
                      </Button>
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
                          <p>
                            This excel document is great for keeping track of
                            everything during your move.
                          </p>
                        </div>
                        <div className="col-12 resources__downloads__outline__button">
                          <Link href="https://joeltransport.co.za/wp-content/uploads/2018/05/Inventory_List.xls">
                            Download
                          </Link>
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
                          <p>
                            RFA has granted us compliance. Have a look below!
                          </p>
                        </div>
                        <div className="col-12 resources__downloads__outline__button">
                          <Link href="https://joeltransport.co.za/wp-content/uploads/2022/09/Joel-Transport-RFA_Membership_Certificate_2022.pdf">
                            Download
                          </Link>
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
                          <p>Have a look at our Armosa compliance details.</p>
                        </div>
                        <div className="col-12 resources__downloads__outline__button">
                          <Link href="https://joeltransport.co.za/wp-content/uploads/2020/09/Joel-Transport-Pty-Ltd-AMOSA_Member_Certificate_2020-.pdf">
                            Download
                          </Link>
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
  );
}
