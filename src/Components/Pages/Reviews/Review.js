import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Review = () => {
  const [reviews, setReviews] = useState([0]);

  useEffect(() => {
    fetch(" https://hidden-dawn-20976.herokuapp.com/review")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <div className="mt-[200px] p-12">
      <h2 className="text-3xl text-center mb-28 underline">Reviews</h2>

      <div
        className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-12"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default Review;
