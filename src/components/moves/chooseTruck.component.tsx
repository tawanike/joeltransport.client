import { useContext, useEffect, useState } from "react";
import { getBooking } from "src/_actions/booking.actions";
import { selectTruck } from "src/_actions/trucks.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { IProduct, UPDATE_HAS_DIRTY_FIELDS } from "src/_models/types";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CostSummaryStateContext from "../../_contexts/costSummary.context";
import TruckDisplay from "./truckDisplay.component";

const ChooseTruck = () => {
  const api = useAPI();
  const bgActiveColor = "#FA551E";
  const bgNonActiveColor = "#979797";

  const [trucks, setTrucks] = useState<any[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<IProduct>();
  const [activeTruck, setActiveTruck] = useState<number>(0);
  const [bookedDates, setBookedDates] = useState<any[]>([]);

  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const bookingContext = useContext(BookingContext);

  useEffect(() => {
    (async () => {
      const trucks = await api.get(
        `/products?category=2&booking=${bookingContext.state.formValues.id}`,
        false
      );
      setTrucks(trucks.results);
    })();
  }, []);

  useEffect(() => {
    if (selectedTruck) {
      bookingContext.dispatch({
        type: UPDATE_HAS_DIRTY_FIELDS,
        payload: {
          hasDirtyFields: true,
        },
      });
      api
        .post(`/bookings/${bookingContext.state.formValues.id}/products`, {
          product: selectedTruck.id,
          quantity: 1,
          product_type: "truck",
          booking: bookingContext.state.formValues.id,
        })
        .then((res) => {
          if (!res.error) {
            // setChooseTruckComplete(true);
            api
              .get(`/bookings/${bookingContext.state.formValues.id}`, false)
              .then((res) => {
                if (!res.error) {
                  bookingContext.dispatch(getBooking(res));

                  const selected_truck = res.products.find(
                    (p: any) => p.category === "trucks"
                  );

                  dispatchCostSummary(
                    selectTruck({
                      quantity: 1,
                      price: selected_truck.price,
                    })
                  );
                }
              });
          }
        });
    }
  }, [selectedTruck]);

  useEffect(() => {
    const truckInContext = bookingContext.state.formValues?.products?.filter(
      (p: any) => p.category === "trucks"
    );

    if (truckInContext && truckInContext.length) {
      const truck = trucks.find((t) => t.slug == "trucks"); //truckInContext[0].slug
      if (truck) {
        setSelectedTruck(truck);
      }
    }
  }, [trucks]);

  useEffect(() => {
    (() => {
      api
        .get(
          `/bookings/unavailable?move_date=${bookingContext.state.formValues?.move_date}&move_time=${bookingContext.state.formValues?.move_time_period}`,
          false
        )
        .then((res) => {
          if (res.length === 0) {
            return;
          }

          setBookedDates(res);
        });
    })();
  }, []);

  useEffect(() => {
    const truckInContext = bookingContext.state.formValues?.products?.filter(
      (p: any) => p.category === "trucks"
    );

    if (truckInContext && truckInContext.length) {
      const truck = trucks.find((t) => t.slug == "trucks"); //truckInContext[0].slug
      if (truck) {
        setSelectedTruck(truck);
      }
    }
  }, [trucks]);

  useEffect(() => {
    api
      .get(
        `/bookings/unavailable?move_date=${bookingContext.state.formValues?.move_date}&move_time=${bookingContext.state.formValues?.move_time_period}`,
        false
      )
      .then((res) => {
        if (res.length === 0) {
          return;
        }
        setBookedDates(res);
      });
  }, [bookingContext.state.formValues.move_date]);

  return (
    <div className="row">
      <div className="col-12">
        <Swiper
          navigation={true}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          spaceBetween={20}
          slidesPerView={2}
          onSlideChange={(swiper) => {
            setActiveTruck(swiper.activeIndex);
            if (swiper.activeIndex < trucks.length - 1) {
              swiper.allowSlideNext = true;
            }
          }}
          breakpoints={{
            300: {
              width: 270,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
          }}
        >
          {trucks.map((truck: IProduct, i) => (
            <SwiperSlide key={truck.id}>
              <TruckDisplay
                truck={truck}
                onSelect={setSelectedTruck}
                inView={i === activeTruck}
                available={
                  bookedDates.find(
                    (availability) => truck.id == availability.id
                  )?.available
                }
                isSelected={
                  selectedTruck
                    ? (selectedTruck as IProduct).id === truck.id
                    : false
                }
              />
            </SwiperSlide>
          ))}
          <SwiperSlide key="last"></SwiperSlide>
        </Swiper>
        <div className="col-12 truckDisplay__truck-summary">
          <p>{trucks.length > 0 && trucks[activeTruck]["description"]}</p>
        </div>
        <div className="col-12 truckDisplay__truck-summary d-flex justify-content-center">
          {trucks.length > 0 &&
            trucks.map((truck, index) => (
              <div
                key={truck.id}
                style={{
                  height: 10,
                  width: 10,
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor:
                    index === activeTruck ? bgActiveColor : bgNonActiveColor,
                }}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseTruck;
