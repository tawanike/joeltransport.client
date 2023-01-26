import { CoverImage } from '../../components/ui';

const ContactUs = () => {
    return (
        <div className="Resources container-fluid">
            <CoverImage
                size="medium"
                src="/img/kaleb.png"
                pageTitle='Services'
                description='Meet the experts in moving and storage'
            />

            <div className="Resources__documents">
                <h2>Contact Us Page</h2>
            </div>
        </div>
    )
}

export default ContactUs;
