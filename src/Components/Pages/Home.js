import React, { useEffect, useState } from "react";
import AboutOur from "./AboutOur";
import Address from "./Address";
import Banner from "./Banner";
import Business from "./Business";
import ProductCard from "./ProductCard";
import ReviewCard from "./Reviews/ReviewCard";
import Footer from "./Shared/Footer";

const Home = () => {
  const [reviews, setReviews] = useState([0]);
  const [products, setProducts] = useState([0]);

  useEffect(() => {
    fetch(" https://hidden-dawn-20976.herokuapp.com/review")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  useEffect(() => {
    fetch(" https://hidden-dawn-20976.herokuapp.com/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <div>
      <Banner />
      <div className="mt-[200px] p-12">
        <h2 className="text-3xl text-center  mb-28 underline">Our Products</h2>
        <div
          className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-12"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          {products.slice(0, 6).map((product) => (
            <ProductCard product={product} key={product._id}></ProductCard>
          ))}
        </div>
      </div>
      <Business />
      <div className="mt-[200px] p-12">
        <h2 className="text-3xl text-center mb-28 underline">Reviews</h2>

        <div
          className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-12"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review}></ReviewCard>
          ))}
        </div>
      </div>
      <Address />
      <AboutOur />
      <Footer />
    </div>
  );
};

export default Home;
