import HomeMoveModalComponent from "components/LandingPage/homeMoveModal.component";
import StorageComponent from "components/Resources/StorageView.component";
import { useRouter } from "next/router";
import { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import StorageModalComponent from "src/components/LandingPage/storageModal.component";
import OfficeRemovalsComponent from "../../components/Resources/OfficeRemovalsView.component";
import SpecialisedServicesComponent from "../../components/Resources/SpecialisedServices.component";
import HomeMoversView from "../../components/Resources/homeMoversView.component";
import { CoverImage } from "../../components/ui";

const Resources = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [show, setShow] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);

  const loadView = (slug: string) => {
    switch (slug) {
      case "home-moves":
        return <HomeMoversView getQuote={setShow} />;
      case "office-removals":
        return <OfficeRemovalsComponent />;
      case "storage":
        return <StorageComponent getQuote={setShowStorageModal} />;
      case "specialized-services":
        return <SpecialisedServicesComponent />;
      default:
        break;
    }
  };

  return (
    <div className="resources container-fluid">
      <HomeMoveModalComponent
        showSelectorModal={show}
        setShowSelectorModal={setShow}
      />
      <StorageModalComponent
        showStorageModal={showStorageModal}
        setShowStorageModal={setShowStorageModal}
      />
      <CoverImage
        size="medium"
        src="/img/services/home_moves_banner_image.png"
        pageTitle="Services"
        description="Meet the experts in moving and storage"
      />
      <div className="row">
        <div className="resources__documents container">
          <div className="row">
            <div className="resources__section-header col-12 mb-3">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/services">Our products</Breadcrumb.Item>
                <Breadcrumb.Item active>{slug}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
        {loadView(slug as string)}
      </div>
    </div>
  );
};

export default Resources;
