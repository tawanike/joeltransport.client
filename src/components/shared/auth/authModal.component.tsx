import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import UserAuthStateContext from "../../../_contexts/userAuth.context";
import { AuthView } from "../../../_models/types";
import ForgotPasswordComponent from "./forgotPassword.component";
import LoginComponent from "./loginForm.component";
import SignupComponent from "./SignupForm.componen";

interface IProps {
    showAuthModal: boolean;
    setShowAuthModal: Dispatch<SetStateAction<boolean>>;
    setAuthView: Dispatch<SetStateAction<AuthView>>;
    view: AuthView
}
const AuthModalComponent: FC<IProps> = ({ showAuthModal, setShowAuthModal, view, setAuthView }) => {
    const { UserAuthState, dispatchUserAuth } = useContext(UserAuthStateContext);

    const logIn = () => {
        setShowAuthModal(false)
    }
    return <>
        {
            <Modal show={showAuthModal} onHide={logIn}>
                <Modal.Body>
                    {view === "login" && <LoginComponent setAuthView={setAuthView} />}
                    {view === "register" && <SignupComponent setAuthView={setAuthView} />}
                    {view === "forgotPassword" && <ForgotPasswordComponent />}
                </Modal.Body>
            </Modal>
        }
    </>
}

export default AuthModalComponent;
