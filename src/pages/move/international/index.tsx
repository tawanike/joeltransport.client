import { CoverImage } from "components/ui";
import Link from "next/link";

const InternationalMoveServices = () => {
  return (
    <div className="moves container-fluid">
      <CoverImage
        size="medium"
        src="/img/kaleb.png"
        pageTitle="Move Services"
        description="Meet the experts in moving and storage"
        variant="--domestic"
      />

      <div className="moves__container container mt-5">
        <ul className="">
          <li className="">
            <Link href="#" onClick={() => console.log(window)}>
              Chat to us
            </Link>
          </li>
          <li className="">
            <Link href="/contact-us">Get in touch</Link>
          </li>
          <li className="">
            <Link href="/move/international/inventory-form">
              Complete inventory
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InternationalMoveServices;
