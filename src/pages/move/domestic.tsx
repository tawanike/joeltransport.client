import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsCartPlus, BsInfoCircle, BsPerson, BsTruck } from 'react-icons/bs';
import { RxCaretDown } from 'react-icons/rx';
import AddedServices from '../../components/moves/addedService.component';
import ChooseTruck from '../../components/moves/chooseTruck.component';
import MoveCostCard from '../../components/moves/moveCostCard.component';
import MoveDetails from '../../components/moves/moveDetails.component';
import PersonalInformation from '../../components/moves/personalInfomation.componnent';
import CallMeBackButton from '../../components/shared/callMeBackButton.component';
import { CoverImage } from '../../components/ui';
import { AuthView, CostSummary, IProduct } from '../../_models/types';
import { productService } from '../../_services/product.service';
import useAPI from "../../_hooks/useAPI";
import UserAuthStateContext from '../../_contexts/userAuth.context';
import AuthModalComponent from '../../components/shared/auth/authModal.component';

const DomesticMoveServices = () => {
    const [currentView, setCurrentView] = useState("")
    const [canConfirmMove, setCanConfirmMove] = useState(true);
    const fetchWrapper = useAPI();
    const [Costs, setCosts] = useState<CostSummary>({} as CostSummary);
    const [Trucks, setTrucks] = useState<IProduct[]>();
    const [AdditionalServices, setAdditionalServices] = useState<IProduct[]>();
    const [ServiceType, setServiceType] = useState<IProduct[]>();
    const { UserAuthState } = useContext(UserAuthStateContext);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authView, setAuthView] = useState<AuthView>("login");

    useEffect(() => {
        const getProducts = async () => {
            const products = await productService.getProducts(fetchWrapper);
            setTrucks(products.results.filter((product: IProduct) => product.category === 1));
            setAdditionalServices(products.results.filter((product: IProduct) => product.category === 2));
            setServiceType(products.results.filter((product: IProduct) => product.category === 3))
        }
        getProducts();
    }, []);

    useEffect(() => {
        goToCheckout();
    }, [UserAuthState])


    const toggleView = (view: string) => {
        if (currentView === view) {
            setCurrentView("");
            return;
        }
        setCurrentView(view);
    }

    const goToCheckout = () => {
        if (!UserAuthState && canConfirmMove) {
            setAuthView("login");
            setShowAuthModal(true);
        } else {
            console.log("move to checkout");
        }
    }

    return <>
        <AuthModalComponent showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} setAuthView={setAuthView} view={authView} />
        <div className="moves container-fluid">
            <CoverImage
                size="medium"
                src="/img/kaleb.png"
                pageTitle='Move Services'
                description='Meet the experts in moving and storage'
            />
            <div className="moves__container container mt-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h2>Make a local move</h2>
                        <p>To provide you with the best quote, we need some information about you
                            Once you are happy with your quote, you will need to log in or create an account to pay</p>
                    </div>
                    <div className="col-6">
                        <div className="col-12 moves__stepper">
                            <div className="moves__step col-12 mb-3">
                                <div className="row">
                                    <div className="col-12 moves__step__head" onClick={() => toggleView("move")}>
                                        <div className="row">
                                            <div className="col-11">
                                                <p><BsInfoCircle className="me-2" /> Move details</p>
                                            </div>

                                            <div className="col-1 moves__step__head__curret">
                                                <RxCaretDown />
                                            </div>
                                        </div>
                                    </div>
                                    {currentView === "move" && <MoveDetails />}
                                </div>
                            </div>
                            <div className="moves__step col-12 mb-3">
                                <div className="row">
                                    <div className="col-12 moves__step__head" onClick={() => toggleView("truck")}>
                                        <div className="row">
                                            <div className="col-11">
                                                <p><BsTruck className="me-2" /> Choose a truck</p>
                                            </div>

                                            <div className="col-1 moves__step__head__curret">
                                                <RxCaretDown />
                                            </div>
                                        </div>
                                    </div>
                                    {currentView === "truck" && <ChooseTruck />}
                                </div>
                            </div>

                            <div className="moves__step col-12 mb-3">
                                <div className="row">
                                    <div className="col-12 moves__step__head" onClick={() => toggleView("added")}>
                                        <div className="row">
                                            <div className="col-11">
                                                <p><BsCartPlus className="me-2" />Added services</p>
                                            </div>

                                            <div className="col-1 moves__step__head__curret">
                                                <RxCaretDown />
                                            </div>
                                        </div>
                                    </div>
                                    {(currentView === "added" && AdditionalServices) && <AddedServices products={AdditionalServices} />}
                                </div>
                            </div>

                            <div className="moves__step col-12 mb-3">
                                <div className="row">
                                    <div className="col-12 moves__step__head" onClick={() => toggleView("personal")}>
                                        <div className="row">
                                            <div className="col-11">
                                                <p><BsPerson className="me-2" />Personal information</p>
                                            </div>

                                            <div className="col-1 moves__step__head__curret">
                                                <RxCaretDown />
                                            </div>
                                        </div>
                                    </div>
                                    {currentView === "personal" && <PersonalInformation />}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-5 offset-1">
                        <MoveCostCard />
                    </div>
                    <div className="col-12 my-5 pt-3 moves__container__button-container">
                        <div className="row w-100">
                            <div className="col-2 offset-8">
                                <CallMeBackButton title="Call me back" />
                            </div>
                            <div className="col-2">
                                <div className="col-12">
                                    <Button disabled={!canConfirmMove} onClick={goToCheckout} variant='secondary'>Confirm move</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DomesticMoveServices;
