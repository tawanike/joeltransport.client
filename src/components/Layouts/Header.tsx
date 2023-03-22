import { useRouter } from "next/router";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import Navigation from "./Navigation";

const Header = () => {
    const router = useRouter();
    return (
        <div className="container-fluid">
            <div className="row Header">
                <div className="container">
                    <div className="Header__topNav row">
                        <div className="col-8">
                            <div className="Header__logo">
                                <img src="/img/logo.png" alt="Logo" />
                            </div>
                        </div>
                        <div className="Header__account col-4 d-flex justify-content-end align-items-center">
                            <span className="agent me-3">Are you an agent?</span>
                            <ul className="Header__icons d-flex justify-content-between">
                                <li className="icon">
                                    <BsFacebook onClick={() => window.open('https://facebook.com/Joel.Transport1965/', '_blank')} />
                                </li>
                                <li className="icon">
                                    <BsInstagram onClick={() => window.open('https://instagram.com/ptyltd.joeltransport/', '_blank')} />
                                </li>
                                <li className="icon">
                                    <BsLinkedin onClick={() => window.open('https://linkedin.com', '_blank')} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {!router.pathname.split("/").includes("checkout") && <Navigation />}
            </div>
        </div>
    );
};

export default Header;
