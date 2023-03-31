import { MdOutlineEmojiTransportation } from "react-icons/md";

function HowItWorks() {
  return (
    <div className="HowItWorks container">
      <div className="row">
        <div className="HowItWorks__image-container col-12 col-md-5">
          <img src="/img/how-it-works.png" alt="How it works" />
        </div>
        <div className="HowItWorks__description col-12 col-md-7 ps-5">
          <h1>How it works</h1>
          <p>Here’s how to schedule your local move or book storage space.</p>
          <ul>
            <li>
              <div className="ServiceCard__icon ServiceCard__icon--blue">
                {<MdOutlineEmojiTransportation />}
              </div>
              <p>Get a free quote</p>
            </li>
            <li>
              <div
                className="ServiceCard__icon"
                style={{ backgroundColor: "var(--color-red-primary)" }}
              >
                {<MdOutlineEmojiTransportation />}
              </div>
              <p>Plan</p>
            </li>
            <li>
              <div
                className="ServiceCard__icon"
                style={{ backgroundColor: "var(--color-error)" }}
              >
                <MdOutlineEmojiTransportation />
              </div>
              <p>Pay</p>
            </li>
            <li>
              <div
                className="ServiceCard__icon"
                style={{ backgroundColor: "var(--color-bg-footer)" }}
              >
                <MdOutlineEmojiTransportation />
              </div>
              <p>Move</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
