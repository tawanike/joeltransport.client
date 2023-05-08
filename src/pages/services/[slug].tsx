import HomeMoveModalComponent from "components/LandingPage/homeMoveModal.component";
import StorageComponent from "components/Resources/StorageView.component";
import { useRouter } from "next/router";
import { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import StorageModalComponent from "src/components/LandingPage/storageModal.component";
import { servicesConfig } from "../../_configurations/services.config";
import InternationalMovesView from "../../components/Resources/InternationalMovesView.component";
import LongDistanceMoveView from "../../components/Resources/LongDistanceMoveView.component";
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
      case "office-relocation":
        return <OfficeRemovalsComponent />;
      case "storage":
        return <StorageComponent getQuote={setShowStorageModal} />;
      case "specialized-services":
        return <SpecialisedServicesComponent />;
      case "long-distance-move":
        return <LongDistanceMoveView />;
      case "international-move":
        return <InternationalMovesView />;
      default:
        break;
    }
  };
  const loadVariant = (slug: string) => {
    switch (slug) {
      case "home-moves":
        return "--home-moves";
      case "office-removals":
        return "--office-moves";
      case "storage":
        return "--storage";
      case "specialized-services":
        return "--specialized-services";
      default:
        return "--home-moves";
    }
  };
  const getCurrentPage = (slug: string) => {
    const current = servicesConfig.find((service) => service.slug === slug);
    return current?.breadcrumb;
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
        src=""
        pageTitle="Services"
        description="Meet the experts in moving and storage"
        variant={loadVariant(slug as string)}
      />
      <div className="row">
        <div className="resources__documents container">
          <div className="row">
            <div className="resources__section-header col-12 mb-3">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/services">Our products</Breadcrumb.Item>
                <Breadcrumb.Item active>
                  {getCurrentPage(slug as string)}
                </Breadcrumb.Item>
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
