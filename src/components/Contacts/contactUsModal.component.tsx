import React, { FC } from 'react'
import { Modal } from 'react-bootstrap'
import ContactUsComponent from './Form'

interface IProps {
    showContactUsModal: boolean;
    setShowContactUsModal: (state: boolean) => void;
}

const ContactUsModal: FC<IProps> = ({ setShowContactUsModal, showContactUsModal }) => {
    return <Modal size="lg" show={showContactUsModal} onHide={() => setShowContactUsModal(false)}>
        <Modal.Body>
            <ContactUsComponent isModal={true} />
        </Modal.Body>
    </Modal>
}

export default ContactUsModal
