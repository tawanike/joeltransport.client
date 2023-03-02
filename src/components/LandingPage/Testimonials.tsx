import Image from "next/image";
import { useEffect, useState } from "react";
// import StarRatingComponent from 'react-star-rating-component';

const Review = ({ review, onClick }: any) => {
  return (
    <>
      <div className="Review row" onMouseEnter={() => onClick(review)}>
        <div className="Review__profile-picture col-2">
          <Image
            src={review.profile_photo_url}
            alt={review.author_name}
            width={64}
            height={64}
          />
        </div>
        <div className="Review__username col-10">
          <div className="Review__line"></div>
          <p>{review.author_name}</p>
        </div>
      </div>
    </>
  );
};

const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedReview, setSelectedReview] = useState<any>({});

  useEffect(() => {
    const placeJSON = require("../../../public/js/places.sample.json");
    const place = placeJSON.result;
    setSelectedReview(place.reviews[0]);
    setReviews(place.reviews);
  }, []);

  return (
    <div className="Testimonials container">
      <h1>Testimonials</h1>
      <h3>What our customers say about us</h3>
      {reviews.length ? (
        <div className="Testimonials__container row">
          <div className="Testimonials__reviewers col-4">
            {reviews.map((review) => (
              <Review
                key={review.author_name}
                review={review}
                onClick={setSelectedReview}
              />
            ))}
          </div>
          <div className="Testimonials__review col-8">
            <p className="Testimonials__review--rating">
              {/* <StarRatingComponent
                                    name="review"
                                    value={selectedReview.rating}
                                    starCount={selectedReview.rating}
                                    starColor="#FA551e"
                                /> */}
            </p>
            <p className="Testimonials__review--text">{selectedReview.text}</p>
            <p className="Testimonials__review--date">
              {selectedReview.relative_time_description}
            </p>
          </div>
        </div>
      ) : (
        'LOADER HERE WITH TEXT "LOADING REVIEWS"'
      )}
    </div>
  );
};

export default Testimonials;
