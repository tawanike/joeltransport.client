/* eslint-disable react/no-unescaped-entities */
import { CoverImage } from "../../components/ui";

export default function About() {
  return (
    <div className="About">
      <CoverImage
        size="medium"
        src="/img/kaleb.png"
        pageTitle={`Mission and Vision`}
        description={`Meet the experts in moving and storage`}
        variant="--domestic"
      />
      <div className="About__our-story container">
        <div className="row">
          <div className="About__our-story--text col-12 col-md-7 p-4">
            <h3>Our Mission</h3>
            <p>
              Joël Transport has been around since 1965. We’re a household name
              with hundreds of satisfied customers.
            </p>
            <p>
              We are based in Centurion, Gauteng; and service domestic
              relocations in the northern, central, western, and eastern areas
              of South Africa. We are experts in the furniture and storage
              industry; and have looked after the moving and relocation needs of
              singles, couples, families, ambassadors, diplomats, managing
              directors and transferees. Joël Transport has also handled large
              office relocations that have lasted weeks for some of the
              country’s finest institutions.
            </p>

            <p>
              We have built the capacity to enable customer airfreight or sea
              shipments from South Africa to any destination in the world – and
              vice versa! Domestic or international removal, and imports and
              exports are a breeze for us.
            </p>

            <p>
              Joël Transport is a modern South African company, and we are proud
              to have a 70% PDI rate with regards to management and ownership.
            </p>
            <p>
              We are purpose driven; participating in initiatives that alleviate
              societal challenges. This includes offering FREE removal within
              Gauteng (as part of a home move) of gently used furniture,
              appliances, clothing and linen, etc. These are in turn donated to
              communities in need through the Lions International organisation.
            </p>
          </div>

          <div className="About__our-story--image col-12 col-md-5">
            <img src="/img/truck.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
