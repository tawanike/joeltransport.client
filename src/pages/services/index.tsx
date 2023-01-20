import { CoverImage } from '../../components/ui';

const Resources = () => {
    return (
        <div className="Resources container-fluid">
            <CoverImage
                size="medium"
                src="/img/kaleb.png"
                pageTitle='Services'
                description='Meet the experts in moving and storage'
            />

            <div className="Resources__documents">
                <h2>Services Page</h2>
            </div>
        </div>
    )
}

export default Resources;
