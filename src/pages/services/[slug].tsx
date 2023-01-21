import Link from 'next/link';
import { useRouter } from 'next/router'
import { Breadcrumb, Button } from 'react-bootstrap';
import { CoverImage } from '../../components/ui';

const Resources = () => {
    const router = useRouter();
    const { slug } = router.query
    return (
        <div className="resources container-fluid">
            <CoverImage
                size="medium"
                src="/img/services/home_moves_banner_image.png"
                pageTitle='Services'
                description='Meet the experts in moving and storage'
            />
            <div className="row">
                <div className="resources__documents container">
                    <div className="row">
                        <div className="resources__section-header col-12 mb-3">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="/services">
                                    Our products
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>{slug}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="resources__products-summary col-12">
                            <div className="row">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resources;
