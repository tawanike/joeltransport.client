import { useContext, useEffect, useState } from "react";
import { getBooking } from "src/_actions/booking.actions";
import { selectTruck } from "src/_actions/trucks.actions";
import { BookingContext } from "src/_contexts/booking.context";
import { useAPI } from "src/_hooks";
import { IProduct } from "src/_models/types";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CostSummaryStateContext from "../../_contexts/costSummary.context";
import TruckDisplay from "./truckDisplay.component";

const ChooseTruck = ({ setChooseTruckComplete }: any) => {
  const api = useAPI();
  const bgActiveColor = "#FA551E";
  const bgNonActiveColor = "#979797";

  const [trucks, setTrucks] = useState<any[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<IProduct>();
  const [activeTruck, setActiveTruck] = useState<number>(0);
  const [index, setIndex] = useState(0);
  const [bookedDates, setBookedDates] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const { CostSummaryState, dispatchCostSummary } = useContext(
    CostSummaryStateContext
  );
  const bookingContext = useContext(BookingContext);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
    if (trucks && trucks.length > 0) setActiveTruck(trucks[selectedIndex]);
  };

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
    let booked: any[] = [];
    api
      .get(
        `/bookings/unavailable?month=${
          currentMonth + 1
        }&year=${new Date().getFullYear()}`,
        false
      )
      .then((res) => {
        console.log("BOOKED DATE", res);
        if (res.length === 0) {
          setBookedDates([]);
          return;
        }

        // res.forEach((date: any) => {
        //   const d = new Date(date.date);
        //   if (
        //     currentMonth === d.getMonth() &&
        //     d.getDate() !== bookingContext.state.formValues.move_date
        //   ) {
        //     booked.push(d.getDate());
        //     setBookedDates([...booked]);
        //   }
        // });
      });
  }, [currentMonth]);

  return (
    <div className="row">
      {/* <div
                className="col-1 truckDisplay__indicators"
                onClick={() => !(index - 1 < 0) && setIndex(index - 1)}
            >
                <RxCaretLeft />
            </div> */}
      <div className="col-12">
        <Swiper
          navigation={true}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
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
        >
          {trucks.map((truck: IProduct, i) => (
            <SwiperSlide key={truck.id}>
              <TruckDisplay
                truck={truck}
                onSelect={setSelectedTruck}
                inView={i === activeTruck}
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
      {/* <div
                className="col-1 truckDisplay__indicators"
                // onClick={() => index + 1 < trucks.length && setIndex(index + 1)}
                onClick={() => swiper.slideNext()}
            >
                <RxCaretRight />
            </div> */}
    </div>
  );
};

export default ChooseTruck;
