import Link from "next/link";
import { useRouter } from "next/router";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import Navigation from "./Navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="container-fluid">
      <div className="row Header">
        <div className="container">
          <div className="Header__topNav row">
            <div className="col-6 col-md-8">
              <div className="Header__logo">
                <Link href="/">
                  <img src="/img/logo.png" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="Header__account col-6 col-md-4 d-flex justify-content-end align-items-center">
              <div
                className="row"
                onClick={() =>
                  window.open(
                    "https://www.moverspoe.com/(S(rxxslwckykai05100lacwr3j))/PriceGenerator.aspx",
                    "_blank"
                  )
                }
              >
                <span className="col-12 col-md-7 agent d-flex justify-content-start align-items-center">
                  Are you a moving services agent?
                </span>
                <ul className="col-12 col-md-5  Header__icons d-flex justify-content-between">
                  <li className="icon">
                    <BsFacebook
                      onClick={() =>
                        window.open(
                          "https://facebook.com/Joel.Transport1965/",
                          "_blank"
                        )
                      }
                    />
                  </li>
                  <li className="icon">
                    <BsInstagram
                      onClick={() =>
                        window.open(
                          "https://instagram.com/ptyltd.joeltransport/",
                          "_blank"
                        )
                      }
                    />
                  </li>
                  <li className="icon">
                    <BsLinkedin
                      onClick={() =>
                        window.open("https://linkedin.com", "_blank")
                      }
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {!router.pathname.split("/").includes("checkout") && <Navigation />}
      </div>
    </div>
  );
};

export default Header;
