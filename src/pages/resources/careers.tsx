import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsClock, BsFillExclamationSquareFill } from "react-icons/bs";
import { useAPI } from "src/_hooks";
import CoverImage from "../../components/ui/CoverImage";

const CareerPage = () => {
  const api = useAPI();
  const [vacancies, setVacancies] = useState<any[]>([]);

  useEffect(() => {
    api.get("/careers", false).then((data) => {
      setVacancies(data.results);
    });
  }, []);

  return (
    <>
      <div className="resources container-fluid">
        <CoverImage
          size="medium"
          src="/img/services/resources_banner.png"
          pageTitle="Careers"
          description="Join the winning team!"
          variant="--resources"
        />

        <div className="resources__career container mt-5">
          {vacancies.length > 0 ? (
            <>
              <div className="row">
                <div className="col-12">
                  <h2 className="mb-3">Vacancies</h2>
                  <p>Are you what we’re looking for?</p>
                </div>

                {vacancies &&
                  vacancies.map((vacancy) => (
                    <div
                      key={vacancy.id}
                      className="col-12 resources__careerEntry mt-5"
                    >
                      <div className="col-12">
                        <div className="row p-4">
                          <div className="col-12 resources__careerEntry__head mb-4">
                            <h4>{vacancy.title}</h4>
                          </div>
                          <div className="col-12 resources__careerEntry__text mb-4">
                            <p>{vacancy.description}</p>
                          </div>
                          <div className="col-9 resources__careerEntry__fulltime">
                            <p>
                              <span className="clock">
                                <BsClock />
                              </span>{" "}
                              {vacancy.contract_type}
                            </p>
                          </div>
                          <div className="col-3 resources__careerEntry__apply">
                            <Button
                              variant="link"
                              onClick={() => {
                                const win: Window = window;
                                win.location = vacancy.link;
                              }}
                            >
                              Apply now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="col-8 offset-2 resources__emptyCareers p-5">
                <div className="col-12 resources__modal__icon danger">
                  <BsFillExclamationSquareFill />
                </div>
                <div className="col-12 resources__modal__head mt-4">
                  <h3>Sorry! We don’t have any openings right now.</h3>
                </div>
                <div className="col-8 offset-2 resources__modal__text mt-4">
                  <p>
                    Thanks for the interest. Check back at another time for
                    vacancies.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CareerPage;
